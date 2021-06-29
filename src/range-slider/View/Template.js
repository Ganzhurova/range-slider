import RootView from './subViews/RootView';
import LineView from './subViews/LineView';
// import BarView from './subViews/BarView';
import ThumbView from './subViews/ThumbView';
import { mix } from '../lib/html';

class Template {
  constructor() {
    this.options = {};
    this.root = new RootView();
    this.line = new LineView();
    // this.bar = new BarView();
    this.from = new ThumbView();

    this.init();
  }

  init() {
    this.from.addClass(mix.from);
    // this.line.addChild(this.bar);
    this.line.addChild(this.from);
    this.root.addChild(this.line);
  }

  setRootEl({ isVertical }) {
    if (this.options.isVertical === isVertical) return;
    this.root.setDirection(mix.direction, isVertical);
  }

  setTo({ isDouble }) {
    if (this.options.isDouble === isDouble) return;

    if (isDouble) {
      this.to = new ThumbView();
      this.to.addClass(mix.to);
      this.line.addChild(this.to);
    } else {
      this.line.removeChild(this.to);
    }
  }

  // setLine() {
  //   // перенести в инит - делается тоько один раз?
  //   this.root.addChild(this.line);
  // }

  build(options) {
    this.setRootEl(options);
    // this.setLine();
    this.setTo(options);
    this.options = JSON.parse(JSON.stringify(options));
    // console.log(this.options);

    return this.root.getVNode();
  }
}

export default Template;
