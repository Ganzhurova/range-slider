import EventEmitter from '../EventEmitter';
import { directions, size, coordNames } from '../lib/constants';

class Component extends EventEmitter {
  static direction = '';

  static coordName = '';

  static sizeName = '';

  init(html) {
    this.el = document.createElement(html.tag);
    this.addClass(html.className);
  }

  addClass(className) {
    this.el.classList.add(className);
  }

  removeClass(className) {
    this.el.classList.remove(className);
  }

  addChild(child) {
    this.el.append(child.getEl());
  }

  removeChild(child) {
    const isChildNode = [...this.el.children].includes(child.getEl());
    if (child && isChildNode) {
      this.el.removeChild(child.getEl());
    }
  }

  getEl() {
    return this.el;
  }

  getBox() {
    return this.el.getBoundingClientRect();
  }

  getSize() {
    const box = this.getBox();

    return box[Component.sizeName];
  }

  getCoords() {
    const box = this.getBox();

    return {
      left: box.left + window.pageXOffset,
      top: box.top + window.pageYOffset,
    };
  }

  static setDirection(isVertical) {
    Component.direction = isVertical ? directions.TOP : directions.LEFT;
    Component.sizeName = isVertical ? size.HEIGHT : size.WIDTH;
    Component.coordName = isVertical ? coordNames.Y : coordNames.X;
  }
}

export default Component;
