import EventEmitter from '../EventEmitter';
import { directions, size, coordNames } from '../lib/constants';

class Component extends EventEmitter {
  static direction = '';

  static coordName = '';

  static sizeName = '';

  static unit = 0;

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

  hidden() {
    this.el.style.visibility = 'hidden';
  }

  show() {
    this.el.style.visibility = '';
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

  getCoord() {
    const box = this.getBox();
    const pageOffset = `page${Component.coordName}Offset`;

    return box[Component.direction] + window[pageOffset];
  }

  fixStyle(obj, currentStyleValue) {
    Object.values(obj).forEach(value => {
      if (value !== currentStyleValue) {
        this.el.style[value] = '';
      }
    });
  }

  static setDirection(isVertical) {
    Component.direction = isVertical ? directions.TOP : directions.LEFT;
    Component.sizeName = isVertical ? size.HEIGHT : size.WIDTH;
    Component.coordName = isVertical ? coordNames.Y : coordNames.X;
  }
}

export default Component;
