import { types } from '../lib/constants';

const stateModel = {
  state: {},

  set(options) {
    Object.assign(this.state, options);
    this.setIsDouble();
    this.toFixedNumberOptions();
    this.validate();
  },

  get() {
    return this.state;
  },

  toFixedNumberOptions() {
    this.state = Object.fromEntries(
      Object.entries(this.state).map(([key, value]) => {
        if (typeof value === 'number') {
          const fixValue = this.toFixed(value);
          return [key, fixValue];
        }
        return [key, value];
      })
    );
  },

  validate() {
    this.validateLimits();
    this.validatePos();
    this.validateStep();
    this.calcDefaultScaleValues();
    this.calcLimitFractionLength();
  },

  validateLimits() {
    let { min, max } = this.state;

    if (min === max) {
      max += 1;
    }

    if (min > max) {
      [min, max] = [max, min];
    }

    this.state.min = min;
    this.state.max = max;
  },

  validatePos() {
    let { from, to } = this.state;

    const isFromInRange = this.isInRange(from);
    const isToInRange = this.isInRange(to);
    const isInvalidComparison = () => this.state.isDouble && from > to;

    const getDefaultFrom = () => this.state.min;
    const getDefaultTo = () => this.state.max;

    if (!isFromInRange) {
      from = getDefaultFrom();
    }

    if (!isToInRange) {
      to = getDefaultTo();
    }

    if (isInvalidComparison()) {
      [from, to] = [to, from];
    }

    this.state.from = from;
    this.state.to = to;
  },

  validateStep() {
    let { step } = this.state;
    step = step ? Math.abs(step) : 0;
    this.state.step = step;
  },

  calcDefaultScaleValues() {
    const values = [];
    const { min, max } = this.state;

    this.scaleStep = this.getDefaultScaleStep(min, max);

    for (let i = min; i <= max; i = this.toFixed(this.scaleStep + i)) {
      values.push(i);
    }

    this.state.values = values;
  },

  getDefaultScaleStep(min, max) {
    const defaultParts = 4;

    return (max - min) / defaultParts;
  },

  calcLimitFractionLength() {
    const arr = [];
    const { min, max, from, step } = this.state;
    arr.push(min, max, from, step, this.scaleStep);

    if (this.state.isDouble) {
      const { to } = this.state;
      arr.push(to);
    }

    const arrLength = arr.map(num => this.getFractionLength(num));
    this.state.fractionLength = Math.max(...arrLength);
  },

  setIsDouble() {
    this.state.isDouble = this.state.type === types.DOUBLE;
  },

  isInRange(value) {
    return value >= this.state.min && value <= this.state.max;
  },

  getFractionLength(number) {
    return number.toString().includes('.')
      ? number
          .toString()
          .split('.')
          .pop().length
      : 0;
  },

  toFixed(number, fractionLength = 5) {
    return +number.toFixed(fractionLength);
  },
};

export default stateModel;
