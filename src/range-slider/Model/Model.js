import EventEmitter from '../EventEmitter';
import defaults from '../lib/defaults';
import types from '../lib/constants';

class Model extends EventEmitter {
  constructor(options) {
    super();
    this.state = { ...defaults, range: null };

    this.setState(options);
  }

  setState(options) {
    if (options === undefined) return;

    const { type, min, max, step, from, to, ...otherOptions } = options;

    this.state = { ...this.state, ...otherOptions };

    this.setLimits(min, max);
    this.setRange();
    this.setStep(step);
    this.setType(type);
    this.setPos(from, to);
  }

  getState() {
    return this.state;
  }

  setType(type) {
    if (!type) return;

    if (type === types.SINGLE || type === types.DOUBLE) {
      this.state.type = type;
    }
  }

  setLimits(minVal, maxVal) {
    if (minVal === undefined && maxVal === undefined) {
      return;
    }

    let min =
      minVal !== undefined ? Model.getRoundedNumber(minVal) : this.state.min;
    let max =
      maxVal !== undefined ? Model.getRoundedNumber(maxVal) : this.state.max;

    if (min === max) {
      return;
    }

    if (min > max) {
      [min, max] = [max, min];
    }

    this.state.min = min;
    this.state.max = max;
  }

  setRange() {
    this.state.range = this.state.max - this.state.min;
  }

  setStep(stepVal) {
    let step =
      stepVal !== undefined
        ? Math.abs(Model.getRoundedNumber(stepVal))
        : this.state.step;

    const isValidStep = step > 0 && step < this.state.max;

    if (!isValidStep) {
      step = this.state.range * 0.1;
    }

    this.state.step = step;
  }

  setPos(fromVal, toVal) {
    const isDouble = this.state.type === types.DOUBLE;
    let from =
      fromVal !== undefined ? Model.getRoundedNumber(fromVal) : this.state.from;

    let to =
      toVal !== undefined ? Model.getRoundedNumber(toVal) : this.state.to;

    const isFromInRange = this.isInRange(from);
    const isToInRange = this.isInRange(to);

    // const isFromDoubleInRange = isFromInRange && from < to;
    // const isToDoubleInRange = this.isInRange(to) && to > from;

    if (!isDouble) {
      if (isFromInRange) {
        this.state.from = from;
      } else {
        this.state.from = this.state.range * 0.5 + this.state.min;
      }
    }

    if (isDouble) {
      if (!isFromInRange) {
        from = this.state.range * 0.25 + this.state.min;
      } else if (from > to) {
        from = this.state.range * 0.25 + this.state.min;
      }

      this.state.from = from;

      if (!isToInRange) {
        to = this.state.range * 0.75 + this.state.min;
      } else if (to < from) {
        to = this.state.range * 0.75 + this.state.min;
      }
      this.state.to = to;
    }
  }

  isInRange(value) {
    return value >= this.state.min && value <= this.state.max;
  }

  static getRoundedNumber(number, fractionLength = 5) {
    return +number.toFixed(fractionLength);
  }
}

export default Model;
