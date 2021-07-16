import Component from './Component';
import RootView from './subViews/RootView';
import LineView from './subViews/LineView';
import ThumbView from './subViews/ThumbView';
import { positionIndex } from '../lib/constants';

class Template {
  constructor(el) {
    this.options = {};
    this.root = new RootView(el);
    this.line = new LineView();
    this.thumbs = [];

    this.init();
  }

  init() {
    this.root.addChild(this.line);
  }

  createInstancesForDouble(callback, arr) {
    const instance = callback();
    instance.addClass(positionIndex[arr.length]);
    arr.push(instance);
    this.line.addChild(instance);
  }

  removeInstanceForDouble(arr) {
    const [instance] = arr.splice(1, 1);
    this.line.removeChild(instance);
  }

  setType(isDouble, arr, callback) {
    if (this.compareOptions({ isDouble })) return;

    const total = {
      DOUBLE: 2,
      SINGLE: 1,
    };
    const iterationsNumber = isDouble ? total.DOUBLE : total.SINGLE;
    const isTypeDouble = () => arr.length === total.DOUBLE;

    for (let i = 0; i < iterationsNumber; i += 1) {
      if (arr.length >= iterationsNumber) break;
      this.createInstancesForDouble(callback, arr);
    }

    if (!isDouble && isTypeDouble()) {
      this.removeInstanceForDouble(arr);
    }
  }

  setDirection({ isVertical }) {
    if (this.compareOptions({ isVertical })) return;
    Component.setDirection(isVertical);
    this.root.setDirection(isVertical);
  }

  renderThumbs({ isDouble }) {
    this.setType(isDouble, this.thumbs, Template.createThumb);
  }

  getSubViews() {
    return Object.entries(this);
  }

  static createThumb() {
    return new ThumbView();
  }

  compareOptions(options) {
    let result;
    const keys = Object.keys(options);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (this.options[key] !== options[key]) {
        result = false;
        break;
      }
      result = true;
    }

    return result;
  }

  build(options) {
    this.setDirection(options);
    this.renderThumbs(options);
    this.options = { ...options };
  }
}

export default Template;
