import EventEmitter from '../EventEmitter';
import Template from './Template';
// import ThumbView from './subViews/ThumbView';
import { html } from '../lib/html';
import { positionIndex } from '../lib/constants';

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
    this.setHandlers();
  }

  initSubViews() {
    const subViews = Object.fromEntries(this.template.getSubViews());
    Object.assign(this, subViews);
  }

  getPosition(index) {
    const positionName = positionIndex[index];
    return this.options[positionName];
  }

  updatePosition() {
    const range = Math.abs(this.options.max - this.options.min);
    const correctPosition = position => position - this.options.min;

    this.thumbs.forEach((thumb, i) => {
      thumb.calcUnit(this.line.getSize(), range);
      thumb.setup(correctPosition(this.getPosition(i)));
    });
  }

  update(options) {
    this.template.build(options);

    this.options = { ...options };
    this.updatePosition();
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

    const i = [...e.target.parentElement.children].indexOf(e.target);
    this.thumbs[i].handlerThumbDragStart(this.line.getCoords(), e);
    const pxValue = this.thumbs[i].getPxValue();
    console.log(pxValue);
    // this.thumbs[i].emit('pxValueChanged');
  }
}

export default View;
