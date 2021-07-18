import EventEmitter from '../EventEmitter';
import Template from './Template';
import { html, mix } from '../lib/html';
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

  setPosition() {
    const range = Math.abs(this.options.max - this.options.min);
    const limitCoords = {};
    const addCoord = (pxValue, index) => {
      limitCoords[index] = pxValue;
    };

    const updatePosition = (pxValue, index) => {
      this.updatePosition(pxValue, index);
    };

    const calcLimitCoords = (pxValue, index) => {
      addCoord(pxValue, index);
      this.calcLimitCoords(limitCoords, index);
    };

    this.thumbs.forEach((thumb, i) => {
      const position = this.getCorrectPosition(i);

      thumb.calcUnit(this.line.getSize(), range);
      thumb.unsubscribe('valueChanged', updatePosition);
      thumb.unsubscribe('valueChanged', calcLimitCoords);
      thumb.subscribe('valueChanged', updatePosition);
      thumb.subscribe('valueChanged', calcLimitCoords);
      console.log(thumb);
      thumb.setup(position);
    });
  }

  updatePosition(pxValue, index) {
    const correctPosition = position => position + this.options.min;
    const position = correctPosition(
      this.thumbs[index].pxValueToPosition(pxValue)
    );

    this.emit('positionChanged', position, index);
  }

  calcLimitCoords(coords, index) {
    this.thumbs[index].calcLimitCoords(coords);
  }

  update(options) {
    this.template.build(options);

    this.options = options;
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
        this.thumbs[i].handlerThumbDragStart(this.line.getCoords(), e);
        this.thumbs[i].addClass(mix.selected);
      } else {
        this.thumbs[i].removeClass(mix.selected);
      }
    });
  }
}

export default View;
