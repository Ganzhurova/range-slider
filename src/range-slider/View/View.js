import EventEmitter from '../EventEmitter';
import Template from './Template';
import ThumbView from './subViews/ThumbView';
import { html, mix } from '../lib/html';
// import { positionIndex } from '../lib/constants';
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

  correctPosition(position) {
    return position - this.options.min;
  }

  getCorrectPosition(index) {
    const positionName = helpers.getPositionName(index);
    return this.correctPosition(this.options[positionName]);
  }

  subscribeToEvents() {
    this.template.subscribe('newInstance', instance => {
      if (!(instance instanceof ThumbView)) return;
      const thumb = instance;

      thumb.subscribe('valueChanged', (pxValue, index) => {
        this.updatePosition(pxValue, index);
        this.setPxValues(pxValue, index);
      });
    });
  }

  setPosition() {
    const range = Math.abs(this.options.max - this.options.min);

    ThumbView.calcUnit(this.line.getSize(), this.thumbs[0].getSize(), range);
    this.thumbs.forEach((thumb, i) => {
      const position = this.getCorrectPosition(i);
      thumb.setup(position);
    });
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

  update(options) {
    this.template.build(options);

    this.options = options;
    this.pxValues = {};
    this.setPosition();
  }

  setHandlers() {
    this.handlerThumbDragStart = this.handlerThumbDragStart.bind(this);

    this.el.addEventListener('mousedown', this.handlerThumbDragStart);
  }

  handlerThumbDragStart(e) {
    e.preventDefault();
    if (!e.target.classList.contains(html.thumb.className)) return;

    const index = [...e.target.parentElement.children].indexOf(e.target);

    this.thumbs.forEach((thumb, i) => {
      if (index === i) {
        thumb.handlerThumbDragStart(this.line.getCoords(), e);
        thumb.addClass(mix.selected);
      } else {
        thumb.removeClass(mix.selected);
      }
    });
  }
}

export default View;
