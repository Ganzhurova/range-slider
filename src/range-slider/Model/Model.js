import EventEmitter from '../EventEmitter';
import { types, defaults } from '../defaults';

class Model extends EventEmitter {
  constructor(options = {}) {
    super();
    this.settings = {};
    Object.assign(this.settings, defaults);

    this.#init(options);
  }

  setType(type) {
    if (type === types.SINGLE || type === types.DOUBLE) {
      this.settings.type = type;
    }
  }

  getType() {
    return this.settings.type;
  }

  setVertical(isVertical) {
    if (Model.isBoolean(isVertical)) {
      this.settings.vertical = isVertical;
    }
  }

  getVertical() {
    return this.settings.vertical;
  }

  setLabel(isLabel) {
    if (Model.isBoolean(isLabel)) {
      this.settings.label = isLabel;
    }
  }

  getLabel() {
    return this.settings.label;
  }

  setScale(isScale) {
    if (Model.isBoolean(isScale)) {
      this.settings.scale = isScale;
    }
  }

  getScale() {
    return this.settings.scale;
  }

  setMin(minValue) {
    if (minValue < this.max) {
      this.min = minValue;
    }
  }

  getMin() {
    return this.min;
  }

  setMax(maxValue) {
    if (maxValue > this.min) {
      this.max = maxValue;
    }
  }

  getMax() {
    return this.max;
  }

  setFrom(fromValue) {
    if (this.isInRange(fromValue)) {
      // if (this.type === types.DOUBLE && fromValue )
      this.from = fromValue;
    }
  }

  getFrom() {
    return this.from;
  }

  setTo(toValue) {
    if (this.isInRange(toValue)) {
      this.to = toValue;
    }
  }

  getTo() {
    return this.to;
  }

  setStep(step) {
    if (Model.isNumber(step)) {
      this.settings.step = Model.getInteger(step);
    }
  }

  getStep() {
    return this.settings.step;
  }

  static isBoolean(value) {
    return typeof value === 'boolean';
  }

  isInRange(value) {
    return value >= this.min && value <= this.max;
  }

  static isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  static getInteger(number) {
    return +number.toFixed();
  }

  #init(options) {
    const baseOptions = {
      type: options?.type,
      vertical: options?.vertical,
      label: options?.label,
      scale: options?.scale,
    };

    Object.entries(baseOptions).forEach(([key, value]) => {
      if (value !== undefined) {
        const action = `set${key[0].toUpperCase() + key.slice(1)}`;
        this[action](value);
      }
    });

    this.#validateStep(options);
  }

  #validateStep(options) {
    const isScale = this.getScale();
    const step = options?.step;

    if (isScale && step !== undefined) {
      this.setStep(step);
    }

    if (!isScale) {
      delete this.settings.step;
    }
    console.log(step);
  }
}

export default Model;
