import EventEmitter from '../EventEmitter';
import Template from './Template';
import Component from './Component';
import ThumbView from './subViews/ThumbView';
import LabelView from './subViews/LabelView';
import { html, mix } from '../lib/html';
import helpers from '../helpers/helpers';

class View extends EventEmitter {
  constructor(selector) {
    super();
    this.el = document.querySelector(selector);
    this.template = new Template(this.el);
    this.options = {};
    this.limitSize = 0;
    this.unit = 0;

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

  subscribeToEvents() {
    this.template.subscribe('newInstance', instance => {
      if (!(instance instanceof ThumbView)) return;
      const thumb = instance;

      thumb.subscribe('percentChanged', (percentValue, index) => {
        this.updatePosition(percentValue, index);
        this.setPercentValues(percentValue, index);
        this.calcLimitCoords(percentValue, index);
        this.updateLabels(percentValue, index);
        this.updateBar();
      });
    });
  }

  calcPercentUnit() {
    this.percentUnit = 100 / this.line.getSize();
    Component.unit = this.percentUnit;
  }

  calcLimitSize() {
    this.limitSize =
      (this.line.getSize() - this.thumbs[0].getSize()) * this.percentUnit;
  }

  calcUnit() {
    const range = Math.abs(this.options.max - this.options.min);

    this.unit = this.limitSize / range;
  }

  positionToPercent(position) {
    return position * this.unit;
  }

  percentToPosition(percent) {
    return percent / this.unit;
  }

  setPercentValues(percentValue, index) {
    this.percentValues[index] = percentValue;
    console.log(this.percentValues);
  }

  calcLimitCoords(percentValue, i) {
    const START_COORD = 0;
    const END_COORD = this.limitSize;
    const getStartIndex = index => index - 1;
    const getEndIndex = index => index + 1;

    const limitCoords = {
      start: this.percentValues[getStartIndex(i)] || START_COORD,
      end: this.percentValues[getEndIndex(i)] || END_COORD,
    };

    this.thumbs[i].setLimitCoords(limitCoords);
  }

  calcPercentValues() {
    const correctPosition = position => position - this.options.min;

    for (let i = 0; i < this.thumbs.length; i += 1) {
      const percentValue = this.positionToPercent(
        correctPosition(this.getPosition(i))
      );
      this.setPercentValues(percentValue, i);
    }
  }

  makeBaseCalc() {
    this.calcPercentUnit();
    this.calcLimitSize();
    this.calcUnit();
    this.calcPercentValues();
  }

  setThumbs() {
    this.thumbs.forEach((thumb, i) => {
      thumb.setup(this.percentValues[i], i);
    });
  }

  // setThumbs() {
  //   const range = Math.abs(this.options.max - this.options.min);
  //   const correctPosition = position => position - this.options.min;
  //
  //   ThumbView.calcUnit(this.getLimitSize(), range);
  //   this.thumbs.forEach((thumb, i) => {
  //     const position = correctPosition(this.getPosition(i));
  //     thumb.setup(position);
  //   });
  // }

  updatePosition(percentValue, index) {
    const correctPosition = position => position + this.options.min;
    const position = correctPosition(this.percentToPosition(percentValue));

    this.emit('positionChanged', position, index);
  }

  updateLabels(percentValue, index) {
    if (this.labels.length === 0) return;

    const thumbSize = this.thumbs[index].getSize() * this.percentUnit;
    const positionText = this.getPositionText(index);

    this.labels[index].setup(percentValue, positionText, thumbSize);
    LabelView.checkOverlap(this.commonLable, ...this.labels);
  }

  updateBar() {
    const correctValue = (this.thumbs[0].getSize() / 2) * this.percentUnit;
    this.bar.setup(correctValue, this.percentValues);
  }

  updateScale() {
    if (!this.options.isScale) return;

    this.scale.setup(this.limitSize, this.options.scaleValues);
  }

  update(options) {
    this.template.build(options);

    this.options = options;
    this.percentValues = {};

    // window.addEventListener('DOMContentLoaded', () => {
    // вызов слушателя перенести в оболочку jq ?
    this.makeBaseCalc();
    this.setThumbs();
    this.updateScale();
    // });
  }

  setHandlers() {
    this.handlerUpdateOnResize = this.handlerUpdateOnResize.bind(this);
    this.handlerThumbDragStart = this.handlerThumbDragStart.bind(this);
    this.handlerScaleDivisionClick = this.handlerScaleDivisionClick.bind(this);

    window.addEventListener('resize', this.handlerUpdateOnResize);
    this.el.addEventListener('mousedown', this.handlerThumbDragStart);
    this.el.addEventListener('touchstart', this.handlerThumbDragStart);
    this.el.addEventListener('click', this.handlerScaleDivisionClick);
  }

  handlerUpdateOnResize() {
    this.makeBaseCalc();
    this.setThumbs();
    this.scale.updateSize(this.limitSize);
  }

  handlerThumbDragStart(e) {
    e.preventDefault();

    const target = e.target.closest(`.${html.thumb.className}`);

    if (!target) return;

    const currentThumb = this.thumbs.find(thumb => thumb.el === target);

    const stepPercentValue = this.positionToPercent(this.options.step);

    currentThumb.handlerThumbDragStart(
      this.line.getCoord(),
      stepPercentValue,
      e
    );

    this.thumbs.forEach(thumb => {
      if (thumb === currentThumb) {
        thumb.addClass(mix.selected);
      } else {
        thumb.removeClass(mix.selected);
      }
    });
  }

  handlerScaleDivisionClick(e) {
    if (!e.target.closest(`.${html.scaleDivision.className}`)) return;
    const a = this.scale.getValue(e);
    console.log(a);
  }
}

export default View;
