import EventEmitter from '../EventEmitter';
import { directions, Events } from '../lib/constants';
import { IStateModel } from '../lib/interfaces';
import { OptionsKeys } from '../lib/types';
import type View from './View';

class Template extends EventEmitter {
  private view: View;

  private options: IStateModel;

  constructor(view: View) {
    super();

    this.view = view;
    this.options = view.options;
    this.init();
    this.subscribeToEvents();
  }

  private init(): void {
    this.view.line.addChild(this.view.bar);
    this.view.line.addChild(this.view.fromThumb);
    this.view.root.addChild(this.view.line);
  }

  private setDirection(isVertical: boolean): void {
    this.view.data.direction = isVertical ? directions.TOP : directions.LEFT;
    this.view.root.setDirection(isVertical);
  }

  private setType(isDouble: boolean) {
    if (isDouble) {
      this.view.line.addChild(this.view.toThumb);
    } else {
      this.view.toThumb.remove();
    }
  }

  private setLabel(isLabel: boolean) {
    if (isLabel) {
      this.view.line.addChild(this.view.fromLabel);
      if (this.view.toThumb.isElExists) {
        this.view.line.addChild(this.view.commonLabel);
        this.view.line.addChild(this.view.toLabel);
      } else {
        this.view.commonLabel.remove();
        this.view.toLabel.remove();
      }
    } else {
      this.view.fromLabel.remove();
      this.view.toLabel.remove();
    }
  }

  private setScale(isScale: boolean) {
    if (isScale) {
      this.view.root.addChild(this.view.scale);
    } else {
      this.view.scale.remove();
    }
  }

  private subscribeToEvents(): void {
    this.subscribe(Events.VERTICAL_CHANGED, () => {
      this.setDirection(this.options.isVertical);
    });
    this.subscribe(Events.DOUBLE_CHANGED, () => {
      this.setType(this.options.isDouble);
      this.setLabel(this.options.isLabel);
    });
    this.subscribe(Events.LABEL_CHANGED, () => {
      this.setLabel(this.options.isLabel);
    });
    this.subscribe(Events.SCALE_CHANGED, () => {
      this.setScale(this.options.isScale);
    });
  }

  public update(keys: OptionsKeys[]) {
    keys.forEach((key) => {
      this.emit(`${<OptionsKeys>key}Changed`);
    });
  }
}

export default Template;
