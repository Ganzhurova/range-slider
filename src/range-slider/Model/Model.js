import EventEmitter from '../EventEmitter';
import types from '../defaults';

class Model extends EventEmitter {
  #defaults = {
    type: types.SINGLE,
    vertical: false,
    label: false,
    scale: false,
    min: 0,
    max: 100,
    from: null,
    to: null,
  };

  constructor(options = {}) {
    super();
    Object.assign(this, this.#defaults, options);
  }

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setVertical(isVertical) {
    this.vertical = isVertical;
  }

  getVertical() {
    return this.vertical;
  }

  setLabel(isLabel) {
    this.label = isLabel;
  }

  getLabel() {
    return this.label;
  }

  setScale(isScale) {
    this.scale = isScale;
  }

  getScale() {
    return this.scale;
  }

  setMin(value) {
    if (value < this.max) {
      this.min = value;
    }
  }

  getMin() {
    return this.min;
  }

  setMax(value) {
    if (value > this.min) {
      this.max = value;
    }
  }

  getMax() {
    return this.max;
  }

  isInRange(value) {
    return value >= this.min && value <= this.max;
  }

  setFrom(value) {
    if (this.isInRange(value)) {
      this.from = value;
    }
  }

  getFrom() {
    return this.from;
  }

  setTo(value) {
    if (this.isInRange(value)) {
      this.to = value;
    }
  }

  getTo() {
    return this.to;
  }
}

export default Model;
