import EventEmitter from '../EventEmitter';
import Template from './Template';
import ThumbView from './subViews/ThumbView';
import LabelView from './subViews/LabelView';
import { html, mix } from '../lib/html';
import { positionIndex } from '../lib/constants';
import helpers from '../helpers/helpers';

class View extends EventEmitter {
  constructor(selector) {
    super();
    this.el = document.querySelector(selector);
    this.template = new Template(this.el);
    this.options = {};

    this.init();
  }

  init() {
    if (this.el.nodeName.toLowerCase() !== html.rootEl.tag) {
      throw new Error('Base element should be <div>!');
    }

    this.initSubViews();
    this.subscribeToEvents();
    this.setHandlers();
  }

  initSubViews() {
    const subViews = Object.fromEntries(this.template.getSubViews());
    Object.assign(this, subViews);
  }

  getPosition(index) {
    const positionName = helpers.getPositionName(index);
    return this.options[positionName];
  }

  getPositionText(index) {
    return this.getPosition(index).toFixed(this.options.fractionLength);
  }

  correctDirection() {
    const arr = [...this.thumbs, ...this.labels, this.commonLable, this.bar];
    arr.forEach(instance => {
      instance.correctDirection();
    });
  }

  correctSize() {
    this.bar.correctSize();
  }

  subscribeToEvents() {
    this.template.subscribe('newInstance', instance => {
      if (!(instance instanceof ThumbView)) return;
      const thumb = instance;

      thumb.subscribe('valueChanged', (pxValue, index) => {
        this.updatePosition(pxValue, index);
        this.setPxValues(pxValue, index);
        this.updateLabels(pxValue, index);
        this.updateBar();
      });
    });
  }

  setThumbs() {
    const range = Math.abs(this.options.max - this.options.min);
    const correctPosition = position => position - this.options.min;

    ThumbView.calcUnit(this.line.getSize(), this.thumbs[0].getSize(), range);
    this.thumbs.forEach((thumb, i) => {
      const position = correctPosition(this.getPosition(i));
      thumb.setup(position);
    });
  }

  updateBar() {
    const correctValue = this.thumbs[0].getSize() / 2;
    this.bar.setup(correctValue, this.pxValues);
  }

  updatePosition(pxValue, index) {
    const correctPosition = position => position + this.options.min;
    const position = correctPosition(ThumbView.pxValueToPosition(pxValue));

    this.emit('positionChanged', position, index);
  }

  setPxValues(pxValue, index) {
    this.pxValues[index] = pxValue;

    this.thumbs[index].calcLimitCoords(this.pxValues);
  }

  updateLabels(pxValue, index) {
    if (this.labels.length === 0) return;

    const thumbSize = this.thumbs[index].getSize();
    const positionText = this.getPositionText(index);

    this.labels[index].setup(pxValue, positionText, thumbSize);
    LabelView.checkOverlap(this.commonLable, ...this.labels);
  }

  updateScale() {
    if (!this.options.isScale) return;

    const size = this.line.getSize() - this.thumbs[0].getSize();

    this.scale.setup(size, this.options.values);
  }

  update(options) {
    this.template.build(options);

    this.options = options;
    this.pxValues = {};

    window.addEventListener('DOMContentLoaded', () => {
      this.correctDirection();
      this.correctSize();
      this.setThumbs();
      this.updateScale();
    });
  }

  setHandlers() {
    const setThumbs = this.setThumbs.bind(this);
    this.handlerThumbDragStart = this.handlerThumbDragStart.bind(this);

    window.addEventListener('resize', setThumbs);
    this.el.addEventListener('mousedown', this.handlerThumbDragStart);
    this.el.addEventListener('touchstart', this.handlerThumbDragStart);
  }

  handlerThumbDragStart(e) {
    e.preventDefault();
    if (!e.target.classList.contains(html.thumb.className)) return;

    let index;

    Object.entries(positionIndex).forEach(([key, value]) => {
      if (e.target.classList.contains(value)) {
        index = +key;
      }
    });

    this.thumbs.forEach((thumb, i) => {
      if (index === i) {
        thumb.handlerThumbDragStart(
          this.line.getCoords(),
          this.options.step,
          e
        );
        thumb.addClass(mix.selected);
      } else {
        thumb.removeClass(mix.selected);
      }
    });
  }
}

export default View;
