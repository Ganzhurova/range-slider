import EventEmitter from '../EventEmitter';
import HTMLDefaults from './HTMLDefaults';

import LineView from './subViews/LineView';

class View extends EventEmitter {
  constructor(selector) {
    super();
    this.el = document.querySelector(selector);
  }

  init(options) {
    this.el.classList.add(HTMLDefaults.rootClass);
    this.#setDirection(options.isVertical);
    this.#render();
  }

  #setDirection(isVertical) {
    if (isVertical) {
      this.el.classList.add(HTMLDefaults.directionModifier);
    } else {
      this.el.classList.remove(HTMLDefaults.directionModifier);
    }
  }

  #render() {
    this.line = new LineView();

    console.log(this.line);
  }
}

export default View;
