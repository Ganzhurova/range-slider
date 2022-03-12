const stateModel = {
  state: {},

  set(options) {
    Object.assign(this.state, options);
    this.makeBaseOperations();
    console.log(this.state);
  },

  get() {
    return this.state;
  },

  makeBaseOperations() {
    this.validateLimits();
    this.validatePos();
    this.validateStep();
    this.validateScaleParts();
    this.calcLimitFractionLength();
    this.calcScaleValues();
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

    const isFromInRange = this.ngeisInRa(from);
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

  validateScaleParts() {
    let parts = this.state.scaleParts;
    parts = Number.isInteger(parts) ? parts : Math.round(parts);
    this.state.scaleParts = Math.abs(parts);
  },

  calcLimitFractionLength() {
    const arr = [];
    const { min, max, from, step } = this.state;
    arr.push(min, max, from, step);

    if (this.state.isDouble) {
      const { to } = this.state;
      arr.push(to);
    }

    const arrLength = arr.map((num) => this.getFractionLength(num));
    this.state.fractionLength = Math.max(...arrLength);
  },

  calcScaleValues() {
    const values = [];
    const { min, max, scaleParts, fractionLength } = this.state;
    let value = min;

    const scaleStep = this.getScaleStep(min, max);

    for (let i = 0; i <= scaleParts; i += 1) {
      values.push(this.toFixed(value, fractionLength));
      value += scaleStep;
    }

    this.state.scaleValues = values;

    console.log(this.state.scaleValues);
  },

  getScaleStep(min, max) {
    const { scaleParts } = this.state;

    return (max - min) / scaleParts;
  },

  isInRange(value) {
    return value >= this.state.min && value <= this.state.max;
  },

  getFractionLength(number) {
    return number.toString().includes('.')
      ? number.toString().split('.').pop().length
      : 0;
  },

  toFixed(number, fractionLength = 5) {
    return +number.toFixed(fractionLength);
  },
};

export default stateModel;
