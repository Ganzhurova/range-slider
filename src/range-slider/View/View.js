import RootView from './subViews/RootView';
import LineView from './subViews/LineView';
import ThumbView from './subViews/ThumbView';
import { html, mix } from '../lib/html';
import { size, directions } from '../lib/constants';

class View {
  constructor(selector) {
    this.options = {};
    this.el = document.querySelector(selector);
    this.direction = {};
    this.lineCoords = {};
    this.unit = 0;

    this.init();
  }

  init() {
    if (this.el.nodeName.toLowerCase() !== html.rootEl.tag) {
      throw new Error('Base element should be <div>!');
    }

    this.initSubViews();
    this.setHandlers();
  }

  initSubViews() {
    this.root = new RootView(this.el);
    this.line = new LineView();
    this.thumbs = [];

    this.addDoubleElement(new ThumbView(), mix.from, this.thumbs);
    this.root.addChild(this.line);
  }

  addDoubleElement(instance, modifier, arr) {
    instance.addClass(modifier);
    arr.push(instance);
    this.line.addChild(instance);
  }

  removeDoubleElement(arr) {
    const [instance] = arr.splice(1, 1);
    this.line.removeChild(instance);
  }

  setDirection({ isVertical }) {
    if (this.options.isVertical === isVertical) return;

    this.root.setDirection(isVertical);

    if (isVertical) {
      this.direction = {
        name: directions.TOP,
        size: size.HEIGHT,
      };
    } else {
      this.direction = {
        name: directions.LEFT,
        size: size.WIDTH,
      };
    }
  }

  setDoubleElements({ isDouble }) {
    if (this.options.isDouble === isDouble) return;

    if (isDouble) {
      this.addDoubleElement(new ThumbView(), mix.to, this.thumbs);
    } else {
      this.removeDoubleElement(this.thumbs);
    }
  }

  calcLineCoords() {
    const lineBox = this.line.getBox();
    const thumbBox = this.thumbs[0].getBox();

    this.lineCoords = {
      left: lineBox.left + window.pageXOffset,
      top: lineBox.top + window.pageYOffset,
      start: 0,
      end: lineBox[this.direction.size] - thumbBox[this.direction.size],
    };
  }

  calcUnit() {
    const { min, max } = this.options;
    this.unit = this.lineCoords.end / Math.abs(max - min);
  }

  positionToPxValue(position) {
    return (position - this.options.min) * this.unit;
  }

  getPositionIndex(i) {
    return i === 0 ? this.options.from : this.options.to;
  }

  setThumbs() {
    this.thumbs.forEach((thumb, i) => {
      thumb.setEl(
        this.positionToPxValue(this.getPositionIndex(i)),
        this.direction.name
      );
    });
  }

  update(options) {
    this.setDirection(options);
    this.setDoubleElements(options);
    this.options = { ...options };

    this.calcLineCoords();
    this.calcUnit();
    this.setThumbs();
  }

  getLimitCoords(i) {
    const limitCoords = { ...this.lineCoords };

    if (this.options.isDouble) {
      if (i === 0) {
        limitCoords.start = this.lineCoords.start;
        limitCoords.end =
          this.thumbs[1].getPxValue() - this.thumbs[1].el.offsetWidth;
        console.log(limitCoords);
        return limitCoords;
      }
      if (i === 1) {
        limitCoords.start =
          this.thumbs[0].getPxValue() + this.thumbs[0].el.offsetWidth;
        limitCoords.end = this.lineCoords.end;
        console.log(limitCoords);
        return limitCoords;
      }
    }

    return limitCoords;
  }

  setHandlers() {
    this.handlerThumbDragStart = this.handlerThumbDragStart.bind(this);

    this.el.addEventListener('mousedown', this.handlerThumbDragStart);
  }

  handlerThumbDragStart(e) {
    e.preventDefault();
    if (!e.target.classList.contains(html.thumb.className)) return;

    const children = [...e.target.parentElement.children];
    const i = children.indexOf(e.target);
    const coords = this.getLimitCoords(i);

    this.thumbs[i].handlerThumbDragStart(coords, e);
  }
}

export default View;
