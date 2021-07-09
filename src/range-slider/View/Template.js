import EventEmitter from '../EventEmitter';
import RootView from './subViews/RootView';
import LineView from './subViews/LineView';
// import BarView from './subViews/BarView';
import ThumbView from './subViews/ThumbView';
import { mix } from '../lib/html';

const direction = {
  TOP: 'top',
  LEFT: 'left',
};

const size = {
  width: 'offsetWidth',
  height: 'offsetHeight',
};

class Template extends EventEmitter {
  constructor() {
    super();
    this.options = {};
    this.root = new RootView();
    this.line = new LineView();
    // this.bar = new BarView();
    this.thumbs = [];
    this.pos = [];
    this.direction = '';
    this.unitChanged = false;

    this.init();
  }

  init() {
    this.setThumb(mix.from);
    this.root.addChild(this.line);
  }

  // initLine() {
  //   this.line.setEl();
  //   console.log(this.line.el);
  // }

  setThumb(modifier) {
    const thumb = new ThumbView();
    thumb.addClass(modifier);
    this.thumbs.push(thumb);
    this.line.addChild(thumb);
  }

  addThumbs({ isDouble }) {
    if (this.options.isDouble === isDouble) return;

    if (isDouble) {
      this.setThumb(mix.to);
    } else {
      const [thumb] = this.thumbs.splice(1, 1);
      this.line.removeChild(thumb);
    }
  }

  setDirection({ isVertical }) {
    if (this.options.isVertical === isVertical) return;
    this.root.setDirection(mix.direction, isVertical);
    this.direction = isVertical ? direction.TOP : direction.LEFT;
    this.changeUnit();
  }

  changeUnit() {
    if (this.unitChanged) return;
    this.unitChanged = true;
  }

  build(options) {
    this.addThumbs(options);
    this.setDirection(options);
    this.options = JSON.parse(JSON.stringify(options));

    return this.root.getVNode();
  }

  setPos() {
    const calcPos = value => {
      const validValue = this.correctValue(value);
      this.pos.push(validValue);
    };

    calcPos(this.options.from);

    if (this.options.isDouble) {
      calcPos(this.options.to);
    }

    this.thumbs.forEach((thumb, i) => {
      thumb.setPos(this.direction, this.pos[i]);
    });
  }

  correctValue(value) {
    return value - this.options.min;
  }

  calcPercentPerUnit() {
    if (!this.unitChanged) return;

    const { min, max, isVertical } = this.options;
    const sizeName = isVertical ? size.height : size.width;
    const lineSize = this.line.getEl()[sizeName];
    const thumbSize = this.thumbs[0].getEl()[sizeName];

    const availablePercentage = ((lineSize - thumbSize) * 100) / lineSize;
    const unit = availablePercentage / (max - min);

    ThumbView.setUnit(unit);

    this.setPos();
  }
}

export default Template;
