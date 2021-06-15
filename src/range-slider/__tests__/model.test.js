import Model from '../Model/Model';

const descOnly = describe.only;

describe('Model: setState', () => {
  let model;

  beforeEach(() => {
    model = new Model();
  });

  test.each([
    {
      options: undefined,
      expected: {
        type: 'single',
        vertical: false,
        label: false,
        scale: false,
        min: 0,
        max: 100,
        from: null,
        to: null,
        step: 1,
      },
    },
  ])(
    'should assign valid values to the object state. Add options: $options',
    ({ options, expected }) => {
      const spy = jest.spyOn(model, 'setState');
      model.setState(options);

      expect(spy).toHaveBeenCalled();
      expect(model.state).toEqual(expected);

      spy.mockRestore();
    }
  );
});

describe('Model: setType', () => {
  let model;
  const defaultType = 'single';

  beforeEach(() => {
    model = new Model();
  });

  test.each([
    { value: undefined, expected: defaultType },
    { value: 1, expected: defaultType },
    { value: true, expected: defaultType },
    { value: 'string', expected: defaultType },
    { value: 'double', expected: 'double' },
    { value: 'single', expected: 'single' },
  ])(
    'should return valid value("double" or "single"). Add value: $value',
    ({ value, expected }) => {
      const spy = jest.spyOn(model, 'setType');
      model.setType(value);

      expect(spy).toHaveBeenCalled();
      expect(model.state.type).toBe(expected);

      spy.mockRestore();
    }
  );
});

describe('Model: setLimits', () => {
  let model;
  const defaultLimits = {
    min: 0,
    max: 100,
  };

  beforeEach(() => {
    model = new Model();
  });

  test.each([
    { min: undefined, max: undefined, expected: defaultLimits },
    // { min: NaN, max: 'one', expected: defaultLimits },
    { min: 50, max: undefined, expected: { min: 50, max: 100 } },
    { min: 2, max: 2, expected: defaultLimits },
    { min: 40, max: 5, expected: { min: 5, max: 40 } },
    { min: 0, max: 6, expected: { min: 0, max: 6 } },
    { min: 1.2, max: 22.5, expected: { min: 1.2, max: 22.5 } },
  ])(
    'should assign a valid values. Add values min: $min, max: $max',
    ({ min, max, expected }) => {
      const spy = jest.spyOn(model, 'setLimits');
      model.setLimits(min, max);

      const limits = {
        min: model.state.min,
        max: model.state.max,
      };

      expect(spy).toHaveBeenCalled();
      expect(limits).toEqual(expected);

      spy.mockRestore();
    }
  );
});

describe('Model: setStep', () => {
  let model;
  const defaultValue = 5;

  beforeEach(() => {
    model = new Model();
  });

  test.each([
    // { value: 'one', expected: defaultValue },
    // { value: NaN, expected: defaultValue },
    { value: undefined, expected: defaultValue },
    { value: 0, expected: 10 },
    { value: 105, expected: 10 },
    { value: 2.5, expected: 2.5 },
    { value: 40, expected: 40 },
  ])('should assign a valid value. Add value $value', ({ value, expected }) => {
    const spy = jest.spyOn(model, 'setStep');
    model.setStep(value);

    expect(spy).toHaveBeenCalled();
    expect(model.state.step).toBe(expected);

    spy.mockRestore();
  });

  test('must be a positive number', () => {
    const spy = jest.spyOn(model, 'setStep');
    const value = -3.6;
    const expected = 3.6;

    model.setStep(value);

    expect(spy).toHaveBeenCalled();
    expect(model.state.step).toBe(expected);

    spy.mockRestore();
  });

  test('must be less than the max value', () => {
    const spy = jest.spyOn(model, 'setStep');
    const { max } = model.state;

    model.setStep(200);

    expect(spy).toHaveBeenCalled();
    expect(model.state.step).toBeLessThan(max);

    spy.mockRestore();
  });
});

descOnly('Model: setPos', () => {
  let model;

  beforeEach(() => {
    model = new Model();
  });

  test.each([
    {
      min: 5,
      max: 10,
      from: undefined,
      to: undefined,
      expected: { from: 7.5, to: 75 },
    },
    {
      min: -8,
      max: 66,
      from: -10,
      to: undefined,
      expected: { from: 29, to: 75 },
    },
    // { from: 'one', to: 'ten', expected: defaultPos },
    { min: 16, max: 66, from: -10, to: 60, expected: { from: 41, to: 75 } },
    {
      min: 10,
      max: 50,
      from: 25,
      to: undefined,
      expected: { from: 25, to: 75 },
    },
    { min: 5, max: 200, from: 40, to: 60, expected: { from: 40, to: 75 } },
  ])(
    'should assign a valid values. Type: single. Add from: $from, to: $to',
    ({ min, max, from, to, expected }) => {
      const spy = jest.spyOn(model, 'setPos');
      model.setLimits(min, max);
      model.setRange();
      model.setPos(from, to);

      const pos = {
        from: model.state.from,
        to: model.state.to,
      };

      expect(spy).toHaveBeenCalled();
      expect(pos).toEqual(expected);

      spy.mockRestore();
    }
  );

  test.each([
    {
      min: 5,
      max: 10,
      from: undefined,
      to: undefined,
      expected: { from: 6.25, to: 8.75 },
    },
    // { from: 'one', to: 'ten', expected: defaultPos },
    {
      min: -66,
      max: -16,
      from: 10,
      to: -20,
      expected: { from: -53.5, to: -20 },
    },
    {
      min: -66,
      max: -16,
      from: -18,
      to: -20,
      expected: { from: -53.5, to: -20 },
    },
    {
      min: 10,
      max: 50,
      from: 25,
      to: undefined,
      expected: { from: 25, to: 40 },
    },
    { min: 5, max: 200, from: 40, to: 60, expected: { from: 40, to: 60 } },
  ])(
    'should assign a valid values. Type: double. Add from: $from, to: $to',
    ({ min, max, from, to, expected }) => {
      const spy = jest.spyOn(model, 'setPos');
      model.setType('double');
      model.setLimits(min, max);
      model.setRange();
      model.setPos(from, to);

      const pos = {
        from: model.state.from,
        to: model.state.to,
      };

      expect(spy).toHaveBeenCalled();
      expect(pos).toEqual(expected);

      spy.mockRestore();
    }
  );
});
