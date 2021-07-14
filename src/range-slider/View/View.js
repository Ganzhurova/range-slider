import RootView from './subViews/RootView';
import LineView from './subViews/LineView';
import ThumbView from './subViews/ThumbView';
import { html, mix } from '../lib/html';
import { size, directions } from '../lib/constants';

class View {
  constructor(selector) {
    this.el = document.querySelector(selector);
    this.options = {};
    this.direction = '';
    this.sizeName = '';

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

  setDoubleElements({ isDouble }) {
    if (this.options.isDouble === isDouble) return;

    if (isDouble) {
      this.addDoubleElement(new ThumbView(), mix.to, this.thumbs);
    } else {
      this.removeDoubleElement(this.thumbs);
    }
  }

  setDirection(isVertical) {
    this.direction = isVertical ? directions.TOP : directions.LEFT;
  }

  setSizeName(isVertical) {
    this.sizeName = isVertical ? size.HEIGHT : size.WIDTH;
  }

  getSizeName() {
    return this.sizeName;
  }

  calcLimitSize(sizeName) {
    const sizePx = this.line.getSize(sizeName);
    this.thumbs.forEach(thumb => {
      thumb.setSizeName(sizeName);
      thumb.calcLimitSize(sizePx);
    });
  }

  calcUnit(min, max) {
    const range = Math.abs(max - min);
    this.thumbs.forEach(thumb => {
      thumb.calcUnit(range);
    });
  }

  correctPosition(position) {
    return position - this.options.min;
  }

  getPosition(index) {
    return index === 0 ? this.options.from : this.options.to;
  }

  setThumbs() {
    this.thumbs.forEach((thumb, i) => {
      thumb.setEl(this.correctPosition(this.getPosition(i)), this.direction);
    });
  }

  updateDirection({ isVertical }) {
    if (this.options.isVertical === isVertical) return;

    this.setDirection(isVertical);
    this.setSizeName(isVertical);
    this.root.setDirection(isVertical);
    this.calcLimitSize(this.getSizeName());
  }

  updateUnit({ isVertical, min, max }) {
    if (
      this.options.isVertical === isVertical &&
      this.options.min === min &&
      this.options.max === max
    )
      return;

    this.calcUnit(min, max);
  }

  update(options) {
    this.setDoubleElements(options);
    this.updateDirection(options);
    this.updateUnit(options);

    this.options = { ...options };

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
    // const coords = this.getLimitCoords(i);

    this.thumbs[i].handlerThumbDragStart(this.line.getCoords, e);
  }
}

export default View;
