import EventEmitter from '../EventEmitter';
import { types, defaults } from '../defaults';

class Model extends EventEmitter {
  constructor(options = {}) {
    super();
    this.state = {};
    Object.assign(this.state, defaults);

    this.update(options);
  }

  update(options = {}) {
    const { type, vertical, label, scale, min, max, step, from, to } = options;
    this.setType(type);
    this.setVertical(vertical);
    this.setLabel(label);
    this.setScale(scale);
    this.setLimits(min, max);
    this.setStep(step);

    if (this.getType === types.SINGLE) {
      this.setFrom(from);
    } else {
      this.setPos(from, to);
    }
  }

  setType(type) {
    if (type === types.SINGLE || type === types.DOUBLE) {
      this.state.type = type;
    }
  }

  getType() {
    return this.state.type;
  }

  setVertical(isVertical) {
    if (Model.isBoolean(isVertical)) {
      this.state.vertical = isVertical;
    }
  }

  getVertical() {
    return this.state.vertical;
  }

  setLabel(isLabel) {
    if (Model.isBoolean(isLabel)) {
      this.state.label = isLabel;
    }
  }

  getLabel() {
    return this.state.label;
  }

  setScale(isScale) {
    if (Model.isBoolean(isScale)) {
      this.state.scale = isScale;
    }
  }

  getScale() {
    return this.state.scale;
  }

  setLimits(minVal, maxVal) {
    if (minVal === undefined && maxVal === undefined) {
      return;
    }

    let min = Model.isNumber(minVal) ? Model.getInteger(minVal) : this.getMin();
    let max = Model.isNumber(maxVal) ? Model.getInteger(maxVal) : this.getMax();

    if (min === max) {
      return;
    }

    if (min > max) {
      [min, max] = [max, min];
    }

    this.state.min = min;
    this.state.max = max;
  }

  getMin() {
    return this.state.min;
  }

  getMax() {
    return this.state.max;
  }

  setFrom(fromValue) {
    const isSingleType = this.getType() === types.SINGLE;

    if (!Model.isNumber(fromValue) || !isSingleType) {
      return;
    }

    if (this.isInRange(fromValue)) {
      this.state.from = Model.getInteger(fromValue);
    }
  }

  getFrom() {
    return this.state.from;
  }

  getTo() {
    return this.state.to;
  }

  setStep(step) {
    if (!Model.isNumber(step)) {
      return;
    }

    if (step > 0 && step < this.getMax()) {
      this.state.step = Model.getInteger(step);
    }
  }

  getStep() {
    return this.state.step;
  }

  isInRange(value) {
    return value >= this.state.min && value <= this.state.max;
  }

  static isBoolean(value) {
    return typeof value === 'boolean';
  }

  static isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  static getInteger(number) {
    return +number.toFixed();
  }
}

export default Model;
