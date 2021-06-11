import EventEmitter from '../EventEmitter';
import { types, defaults } from '../defaults';

class Model extends EventEmitter {
  constructor(options = {}) {
    super();
    this.state = {};
    Object.assign(this.state, defaults);

    this.#init(options);
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

    let min = Model.isNumber(minVal) ? minVal : this.getMin();
    let max = Model.isNumber(maxVal) ? maxVal : this.getMax();

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

  // setFrom(fromValue) {
  //   if (this.isInRange(fromValue)) {
  //     // if (this.type === types.DOUBLE && fromValue )
  //     this.from = fromValue;
  //   }
  // }
  //
  // getFrom() {
  //   return this.from;
  // }
  //
  // setTo(toValue) {
  //   if (this.isInRange(toValue)) {
  //     this.to = toValue;
  //   }
  // }
  //
  // getTo() {
  //   return this.to;
  // }
  //
  // setStep(step) {
  //   if (Model.isNumber(step)) {
  //     this.state.step = Model.getInteger(step);
  //   }
  // }
  //
  // getStep() {
  //   return this.state.step;
  // }

  static isBoolean(value) {
    return typeof value === 'boolean';
  }

  // isInRange(value) {
  //   return value >= this.min && value <= this.max;
  // }

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

    const min = options?.min;
    const max = options?.max;

    this.setLimits(min, max);

    // this.#validateStep(options);
  }

  // #validateStep(options) {
  //   const isScale = this.getScale();
  //   const step = options?.step;
  //
  //   if (isScale && step !== undefined) {
  //     this.setStep(step);
  //   }
  //
  //   if (!isScale) {
  //     delete this.state.step;
  //   }
  //   console.log(step);
  // }
}

export default Model;
