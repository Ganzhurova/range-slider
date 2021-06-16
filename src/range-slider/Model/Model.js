import EventEmitter from '../EventEmitter';
import defaults from '../lib/defaults';
import types from '../lib/constants';

class Model extends EventEmitter {
  constructor(options) {
    super();
    this.state = { ...defaults };

    this.setState(options);
  }

  setState(options) {
    const state = this.getState();
    const newState = { ...state, ...options };
    let { min, max } = newState;

    ({ min, max } = Model.validateLimits(min, max));
    // const range = Model.getRange(limits);
    // const provenStep = Model.validateStep(step, limits.max, range);
    //
    // newState = { ...newState, ...limits, step: provenStep };
    // console.log(min, max);
    console.log(newState);
    // console.log(range);

    this.state = { ...newState };
  }

  getState() {
    return this.state;
  }

  static validateLimits(minVal, maxVal) {
    let min = Model.toFixed(minVal);
    let max = Model.toFixed(maxVal);

    if (min === max) {
      max += 1;
    }

    if (min > max) {
      [min, max] = [max, min];
    }

    return {
      min,
      max,
    };
  }

  static validateStep(stepVal, max, range) {
    let step = Math.abs(Model.toFixed(stepVal));

    const isValidStep = step > 0 && step < max;

    if (!isValidStep) {
      step = Model.toFixed(range * 0.1);
    }

    return step;
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

  static getRange({ min, max }) {
    return max - min;
  }

  static toFixed(number, fractionLength = 5) {
    return +number.toFixed(fractionLength);
  }
}

export default Model;
