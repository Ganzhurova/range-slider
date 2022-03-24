import type { ILimitCoords, IOptions } from '../lib/interfaces';
import type { ObjKey } from '../lib/types';
import DEFAULT_CONFIG from '../lib/defaultConfig';
import { Events } from '../lib/constants';

import EventEmitter from '../EventEmitter';
import Template from './Template';
import Calculation from './Calculation';
import RootView from './subViews/RootView';
import LineView from './subViews/LineView';
import BarView from './subViews/BarView';
import ThumbView from './subViews/ThumbView';
import LabelView from './subViews/LabelView';
import ScaleView from './subViews/ScaleView';

type OptionsKey = ObjKey<IOptions>;
type PositionKeys = 'from' | 'to';

class View extends EventEmitter {
  private options: IOptions = { ...DEFAULT_CONFIG };

  private el: HTMLElement;

  private template: Template;

  private calculation: Calculation;

  public root: RootView;

  public line: LineView;

  public bar: BarView;

  public fromThumb: ThumbView;

  public toThumb: ThumbView;

  public fromLabel: LabelView;

  public toLabel: LabelView;

  public commonLabel: LabelView;

  public scale: ScaleView;

  constructor(selector: string) {
    super();
    this.el = <HTMLElement>document.querySelector(selector);

    this.root = new RootView(this.el);
    this.line = new LineView();
    this.bar = new BarView();
    this.fromThumb = new ThumbView();
    this.toThumb = new ThumbView();
    this.fromLabel = new LabelView();
    this.toLabel = new LabelView();
    this.commonLabel = new LabelView();
    this.scale = new ScaleView();
    this.template = new Template(this);
    this.calculation = new Calculation(this);

    this.init();
    this.subscribeToTemplateEvents();
    this.subscribeToThumbEvent('from');
    this.subscribeToThumbEvent('to');
    this.addEventListeners();
  }

  private init(): void {
    this.template.init();
  }

  private subscribeToTemplateEvents(): void {
    this.subscribe(Events.VERTICAL_CHANGED, () => {
      this.template.setDirection(this.options.isVertical);
    });
    this.subscribe(Events.DOUBLE_CHANGED, () => {
      this.template.setType(this.options.isDouble, this.options.isLabel);
      this.bar.setType(this.options.isDouble);
    });
    this.subscribe(Events.LABEL_CHANGED, () => {
      this.template.setLabel(this.options.isDouble, this.options.isLabel);
    });
    this.subscribe(Events.SCALE_CHANGED, () => {
      this.template.setScale(this.options.isScale);
      this.scale.setIsElExists(this.options.isScale);
    });
  }

  private subscribeToThumbEvent(key: PositionKeys): void {
    const thumb: ThumbView = this[`${key}Thumb`];
    const label: LabelView = this[`${key}Label`];
    const position = this.options[key];

    thumb.subscribe(Events.NEW_PERCENT_POSITION, () => {
      label.update(thumb.getPercentPosition(), `${position}`);
      LabelView.switchCommonLabel(
        this.commonLabel,
        this.fromLabel,
        this.toLabel
      );
      this.bar.update(
        this.fromThumb.getPercentPosition(),
        this.toThumb.getPercentPosition()
      );
    });
  }

  private getChangedKeys(options: IOptions): OptionsKey[] {
    const changedKeys: OptionsKey[] = [];

    Object.keys(options).forEach((key) => {
      if (options[<OptionsKey>key] !== this.options[<OptionsKey>key]) {
        changedKeys.push(<OptionsKey>key);
      }
    });

    return changedKeys;
  }

  private setThumbAndLabel(key: PositionKeys): void {
    const thumb: ThumbView = this[`${key}Thumb`];
    const label: LabelView = this[`${key}Label`];
    const position = this.options[key];
    const getValidPosition = (value: number) => value - this.options.min;

    thumb.setup(this.calculation.positionToPercent(getValidPosition(position)));
    label.setup(this.fromThumb.getSize());
    label.update(thumb.getPercentPosition(), `${position}`);
  }

  private getScaleValues(): string[] {
    const values: string[] = [];
    const { min, max, scaleParts } = this.options;
    const step: number = (max - min) / scaleParts;
    const fractionLength = Calculation.getFractionLength(this.options);

    let value: number = min;

    for (let i = 0; i <= scaleParts; i += 1) {
      values.push(value.toFixed(fractionLength));
      value = +value + step;
    }

    return values;
  }

  getLimitCoords(key: PositionKeys): ILimitCoords {
    const startCoord = 0;
    const fromCoord = this.fromThumb.getPercentPosition();
    const toCoord = this.toThumb.getPercentPosition();
    const endCoord = this.calculation.percentageLimitSize;
    const getFromEndCoord = () => (this.options.isDouble ? toCoord : endCoord);

    return {
      start: key === 'from' ? startCoord : fromCoord,
      end: key === 'from' ? getFromEndCoord() : endCoord,
    };
  }

  private setup(): void {
    this.calculation.makeBaseCalc(this.options.min, this.options.max);
    this.setThumbAndLabel('from');
    this.setThumbAndLabel('to');
    LabelView.switchCommonLabel(this.commonLabel, this.fromLabel, this.toLabel);
    this.bar.setup(this.fromThumb.getSize());
    this.bar.update(
      this.fromThumb.getPercentPosition(),
      this.toThumb.getPercentPosition()
    );
    this.scale.setup(this.calculation.percentageLimitSize);
  }

  private addEventListeners(): void {
    window.addEventListener('resize', () => {
      this.setup();
    });
    this.el.addEventListener('mousedown', (e) => {
      this.fromThumb.handlerThumbDragStart(e, this.getLimitCoords('from'));
      this.toThumb.handlerThumbDragStart(e, this.getLimitCoords('to'));
    });
    this.el.addEventListener('touchstart', (e) => {
      this.fromThumb.handlerThumbDragStart(e, this.getLimitCoords('from'));
      this.toThumb.handlerThumbDragStart(e, this.getLimitCoords('to'));
    });
  }

  public update(options: IOptions): void {
    const changedKeys = this.getChangedKeys(options);

    this.options = { ...options };

    changedKeys.forEach((key) => {
      this.emit(`${<OptionsKey>key}Changed`);
    });

    this.scale.renderDivisions(this.getScaleValues());
    this.setup();
  }
}

export default View;
