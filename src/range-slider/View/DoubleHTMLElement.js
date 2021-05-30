import HTMLElement from './HTMLElement';
import types from '../defaults';

class DoubleHTMLElement extends HTMLElement {
  constructor(options) {
    super();
    this.type = options.type;
  }

  createEl(options) {
    super.createEl(options);
    this.fromEl = this.el.cloneNode(true);
    this.toEl = this.el.cloneNode(true);
  }

  getEl() {
    if (this.type === types.DOUBLE) {
      const doubleElements = document.createDocumentFragment();
      doubleElements.append(this.fromEl, this.toEl);
      return doubleElements;
    }

    return super.getEl();
  }
}

export default DoubleHTMLElement;
