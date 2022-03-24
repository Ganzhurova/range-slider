import type View from './View';

import Component from './Component';

class Template {
  private view: View;

  constructor(view: View) {
    this.view = view;
  }

  public init(): void {
    this.view.line.addChild(this.view.bar);
    this.view.line.addChild(this.view.fromThumb);
    this.view.root.addChild(this.view.line);
  }

  public setDirection(isVertical: boolean): void {
    Component.setDirection(isVertical);
    this.view.root.setDirection(isVertical);
  }

  public setType(isDouble: boolean, isLabel: boolean) {
    if (isDouble) {
      this.view.line.addChild(this.view.toThumb);
    } else {
      this.view.toThumb.remove();
    }
    this.setOtherLabels(isDouble, isLabel);
  }

  public setLabel(isDouble: boolean, isLabel: boolean) {
    if (isLabel) {
      this.view.line.addChild(this.view.fromLabel);
      this.view.fromLabel.setIsElExists(isLabel);
    } else {
      this.view.fromLabel.remove();
      this.view.fromLabel.setIsElExists(isLabel);
    }
    this.setOtherLabels(isDouble, isLabel);
  }

  public setScale(isScale: boolean) {
    if (isScale) {
      this.view.root.addChild(this.view.scale);
    } else {
      this.view.scale.remove();
    }
  }

  private setOtherLabels(isDouble: boolean, isLabel: boolean) {
    if (isDouble && isLabel) {
      this.view.line.addChild(this.view.commonLabel);
      this.view.line.addChild(this.view.toLabel);
      this.view.toLabel.setIsElExists(isLabel);
      this.view.commonLabel.setIsElExists(isLabel);
    } else {
      this.view.commonLabel.remove();
      this.view.toLabel.setIsElExists(false);
      this.view.toLabel.remove();
      this.view.commonLabel.setIsElExists(false);
    }
  }
}

export default Template;
