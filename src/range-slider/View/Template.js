import EventEmitter from '../EventEmitter';
import Component from './Component';
import RootView from './subViews/RootView';
import LineView from './subViews/LineView';
import ThumbView from './subViews/ThumbView';
import LabelView from './subViews/LabelView';
import BarView from './subViews/BarView';
import ScaleView from './subViews/ScaleView';
import { positionIndex } from '../lib/constants';

class Template extends EventEmitter {
  constructor(el) {
    super();
    this.options = {};
    this.root = new RootView(el);
    this.line = new LineView();
    this.thumbs = [];
    this.labels = [];
    this.commonLable = Template.createLabel();
    this.bar = new BarView();
    this.scale = new ScaleView();

    this.init();
  }

  init() {
    this.line.addChild(this.bar);
    this.root.addChild(this.line);
  }

  createInstancesForDouble(callback, arr) {
    const instance = callback();
    instance.addClass(positionIndex[arr.length]);
    arr.push(instance);
    this.line.addChild(instance);
    this.emit('newInstance', instance);
  }

  removeInstanceForDouble(arr) {
    const [instance] = arr.splice(1, 1);
    this.line.removeChild(instance);
  }

  setType(isDouble, arr, callback) {
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
    if (this.compareOptions({ isDouble })) return;
    this.setType(isDouble, this.thumbs, Template.createThumb);
  }

  renderLabel({ isLabel, isDouble }) {
    if (this.compareOptions({ isLabel, isDouble })) return;

    if (isLabel) {
      this.setType(isDouble, this.labels, Template.createLabel);
    } else {
      this.labels.forEach(label => {
        this.line.removeChild(label);
      });
      this.labels.length = 0;
    }

    if (isLabel && isDouble) {
      this.line.addChild(this.commonLable);
    } else if (!isLabel || !isDouble) {
      this.line.removeChild(this.commonLable);
    }
  }

  renderScale({ isScale }) {
    if (this.compareOptions({ isScale })) return;

    if (isScale) {
      this.root.addChild(this.scale);
    } else {
      this.root.removeChild(this.scale);
    }
  }

  getSubViews() {
    return Object.entries(this);
  }

  static createThumb() {
    return new ThumbView();
  }

  static createLabel() {
    return new LabelView();
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
    this.renderLabel(options);
    this.renderScale(options);
    this.options = { ...options };
  }
}

export default Template;
