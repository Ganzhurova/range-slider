import EventEmitter from '../EventEmitter';
import HTMLDefaults from './HTMLDefaults';

import LineView from './subViews/LineView';

class View extends EventEmitter {
  constructor(selector) {
    super();
    this.presenter = null;
    this.el = document.querySelector(selector);
  }

  registerWith(presenter) {
    this.presenter = presenter;
  }

  init() {
    this.el.classList.add(HTMLDefaults.rootClass);
    this.#setDirection(this.#getIsVertical());
    this.#render();
  }

  #getIsVertical() {
    return this.presenter.getIsVertical();
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
