import { IDataView, IOptions, Settings } from '../lib/interfaces';
import { directions, Events } from '../lib/constants';
import { HTML } from '../lib/html';

import EventEmitter from '../EventEmitter';
import RootView from './subViews/RootView';
import BarView from './subViews/BarView';
import Template from './Template';
import LineView from './subViews/LineView';
import { OptionsKeys, PositionKeys } from '../lib/types';
import Calculation from './Calculation';
import ThumbView from './subViews/ThumbView';

class View extends EventEmitter {
  private el: HTMLElement;

  private template: Template;

  private calculation: Calculation;

  public options: IOptions;

  public data: IDataView = {
    direction: directions.LEFT,
    percentPerPx: 0,
    percentPerPosition: 0,
    percentageLimitSize: 0,
    fractionLength: 0,
  };

  public root: RootView;

  public line: LineView;

  public bar: BarView;

  public fromThumb: ThumbView;

  public toThumb: ThumbView;

  constructor(element: HTMLElement, options: IOptions) {
    super();
    this.el = element;
    this.options = options;

    const settings: Settings = {
      data: this.data,
      options: this.options,
    };

    this.root = new RootView(settings, HTML.rootEl, element);
    this.line = new LineView(settings, HTML.line);
    this.bar = new BarView(settings, HTML.bar);
    this.fromThumb = new ThumbView(settings, HTML.thumb);
    this.toThumb = new ThumbView(settings, HTML.thumb);
    this.template = new Template(this);
    this.calculation = new Calculation(this);

    this.subscribeToThumbEvent('from');
    this.subscribeToThumbEvent('to');
    this.addEventListeners();
    this.setup();
  }

  private subscribeToThumbEvent(key: PositionKeys): void {
    const thumb: ThumbView = this[`${key}Thumb`];

    thumb.subscribe(Events.NEW_PERCENT_POSITION, () => {
      this.bar.update(
        this.fromThumb.getPercentPosition(),
        this.toThumb.getPercentPosition()
      );
    });
  }

  private handlerUpdateOnResize() {
    this.setup();
  }

  private handlerThumbDragStart(e: MouseEvent | TouchEvent): void {
    this.fromThumb.handlerThumbDragStart(
      e,
      this.calculation.getLimitCoords('from')
    );
    this.toThumb.handlerThumbDragStart(
      e,
      this.calculation.getLimitCoords('to')
    );
  }

  private addEventListeners(): void {
    this.handlerUpdateOnResize = this.handlerUpdateOnResize.bind(this);
    this.handlerThumbDragStart = this.handlerThumbDragStart.bind(this);

    window.addEventListener('resize', this.handlerUpdateOnResize);
    this.el.addEventListener('mousedown', this.handlerThumbDragStart);
    this.el.addEventListener('touchstart', this.handlerThumbDragStart);
  }

  private setupThumbAndLabel(key: PositionKeys): void {
    const thumb: ThumbView = this[`${key}Thumb`];

    thumb.setup(key);
  }

  private setup(): void {
    this.calculation.makeBaseCalc();
    this.setupThumbAndLabel('from');
    this.setupThumbAndLabel('to');
    this.bar.setup(this.fromThumb.getSize());
    this.bar.update(
      this.fromThumb.getPercentPosition(),
      this.toThumb.getPercentPosition()
    );
  }

  public update(keys: OptionsKeys[]): void {
    this.template.update(keys);
    this.setup();
  }
}

export default View;
