import types from '../lib/constants';

const stateModel = {
  state: {},
  limitFractionLength: 0,
  stepFractionLength: 0,

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
    this.calcLimitFractionLength();
    this.validateStep();
    this.validatePos();
    this.calcScaleRange();
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

  validateStep() {
    let step = Math.abs(this.state.step);
    const range = this.state.max - this.state.min;

    this.setStepFractionLength(this.getFractionLength(step));

    const isValidStep = step > 0 && step < this.state.max;

    const getDefaultStep = () =>
      this.toFixed(range * 0.1, this.stepFractionLength);

    if (!isValidStep) {
      this.setStepFractionLength(this.limitFractionLength);
      step = getDefaultStep();

      while (step === 0) {
        this.stepFractionLength += 1;
        step = getDefaultStep();
      }
    }

    this.state.step = step;
  },

  validatePos() {
    let { from, to } = this.state;

    const isFromInRange = this.isInRange(from);
    const isToInRange = this.isInRange(to) && to !== null;
    const isIdenticalPos = () => this.state.isDouble && from === to;
    const isInvalidComparison = () => this.state.isDouble && from > to;

    const getDefaultFrom = () => this.state.min;
    const getDefaultTo = () => this.state.max;

    if (!isFromInRange) {
      from = getDefaultFrom();
    }

    if (!isToInRange) {
      to = getDefaultTo();
    }

    if (isIdenticalPos()) {
      from = getDefaultFrom();
      to = getDefaultTo();
    }

    if (isInvalidComparison()) {
      [from, to] = [to, from];
    }

    this.state.from = from;
    this.state.to = this.state.isDouble ? to : null;
  },

  calcScaleRange() {
    let { scaleRange } = this.state;
    scaleRange = [];

    const setScaleRange = () => {
      this.state.scaleRange = scaleRange;
    };

    const { isScale, min, max, step } = this.state;

    if (!isScale) {
      setScaleRange();
      return;
    }

    for (let i = min; i < max + step; i += step) {
      i = i > max ? max : i;
      scaleRange.push(i);
    }

    setScaleRange();
  },

  calcLimitFractionLength() {
    const minLength = this.getFractionLength(this.state.min);
    const maxLength = this.getFractionLength(this.state.max);
    this.limitFractionLength = Math.max(minLength, maxLength);
  },

  setIsDouble() {
    this.state.isDouble = this.state.type === types.DOUBLE;
  },

  setStepFractionLength(value) {
    this.stepFractionLength = value;
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
