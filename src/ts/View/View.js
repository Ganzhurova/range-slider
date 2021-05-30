import EventEmitter from '../EventEmitter';
import HTMLDefaults from './HTMLDefaults';
// import types from '../defaults';
// import Template from './Template';

import LineView from './subViews/LineView';
import BarView from './subViews/BarView';
import ThumbView from './subViews/ThumbView';
import LabelView from './subViews/LabelView';

class View extends EventEmitter {
  constructor(selector) {
    super();
    this.el = document.querySelector(selector);
  }

  init(viewModel) {
    this.line = new LineView(viewModel);
    this.bar = new BarView(viewModel);
    this.thumb = new ThumbView(viewModel);
    this.label = new LabelView(viewModel);
    console.log(this.line);
    console.log(this.bar);
    console.log(this.thumb);
    console.log(this.label);

    this.elements = {
      line: this.line.getEl(),
      bar: this.bar.getEl(),
      thumbs: this.thumb.getEl(),
      labels: this.label.getEl(),
    };

    console.log(this.elements);
    // const template = new Template(viewModel).init();
    // this.el.innerHTML = template;

    this.el.classList.add(HTMLDefaults.rootClass);
    this.#setDirection(viewModel.isVertical);

    this.#render();
  }

  #render() {
    this.elements.line.append(
      this.elements.bar,
      this.elements.thumbs,
      this.elements.labels ?? ''
    );

    this.el.append(this.elements.line);
  }

  #setDirection(isVertical) {
    if (isVertical) {
      this.el.classList.add(HTMLDefaults.directionModifier);
    } else {
      this.el.classList.remove(HTMLDefaults.directionModifier);
    }
  }
}

export default View;
