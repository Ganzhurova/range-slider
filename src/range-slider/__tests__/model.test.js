import Model from '../Model/Model';

// const descOnly = describe.only;

describe('Model: setType', () => {
  const model = new Model();

  test.each([
    { value: 1, expected: 'single' },
    { value: true, expected: 'single' },
    { value: 'string', expected: 'single' },
    { value: 'double', expected: 'double' },
    { value: 'single', expected: 'single' },
  ])(
    'type must have the correct value("double" or "single"). Add value $value',
    ({ value, expected }) => {
      const spy = jest.spyOn(model, 'setType');
      model.setType(value);

      expect(spy).toHaveBeenCalled();
      expect(model.state.type).toBe(expected);

      spy.mockRestore();
    }
  );
});

describe('Model: getType', () => {
  const model = new Model();

  test('must return a value of the type', () => {
    const spy = jest.spyOn(model, 'getType');
    const originalType = model.state.type;

    const type = model.getType();

    expect(spy).toHaveBeenCalled();
    expect(type).toBe(originalType);

    spy.mockRestore();
  });
});

describe('Model: setVertical', () => {
  const model = new Model();

  test.each([
    { value: 1, expected: false },
    { value: 'string', expected: false },
    { value: true, expected: true },
    { value: false, expected: false },
  ])(
    'vertical must have the correct value(true or false). Add value $value',
    ({ value, expected }) => {
      const spy = jest.spyOn(model, 'setVertical');
      model.setVertical(value);

      expect(spy).toHaveBeenCalled();
      expect(model.state.vertical).toBe(expected);

      spy.mockRestore();
    }
  );

  test('isBoolean method must be called', () => {
    const isBooleanSpy = jest.spyOn(Model, 'isBoolean');
    const arg = true;
    model.setVertical(arg);

    expect(isBooleanSpy).toHaveBeenCalled();
    expect(isBooleanSpy).toHaveBeenCalledWith(arg);
  });
});

describe('Model: getVertical', () => {
  const model = new Model();

  test('must return a value of the vertical', () => {
    const spy = jest.spyOn(model, 'getVertical');
    const originalVertical = model.state.vertical;

    const isVertical = model.getVertical();

    expect(spy).toHaveBeenCalled();
    expect(isVertical).toBe(originalVertical);
  });
});

describe('Model: setLabel', () => {
  const model = new Model();

  test.each([
    { value: 1, expected: false },
    { value: 'string', expected: false },
    { value: true, expected: true },
    { value: false, expected: false },
  ])(
    'label must have the correct value(true or false). Add value $value',
    ({ value, expected }) => {
      const spy = jest.spyOn(model, 'setLabel');
      model.setLabel(value);

      expect(spy).toHaveBeenCalled();
      expect(model.state.label).toBe(expected);

      spy.mockRestore();
    }
  );
});

describe('Model: getLabel', () => {
  const model = new Model();

  test('must return a value of the label', () => {
    const spy = jest.spyOn(model, 'getLabel');
    const originalLabel = model.state.label;

    const isLabel = model.getLabel();

    expect(spy).toHaveBeenCalled();
    expect(isLabel).toBe(originalLabel);
  });
});

describe('Model: setScale', () => {
  const model = new Model();

  test.each([
    { value: 1, expected: false },
    { value: 'string', expected: false },
    { value: true, expected: true },
    { value: false, expected: false },
  ])(
    'scale must have the correct value(true or false). Add value $value',
    ({ value, expected }) => {
      const spy = jest.spyOn(model, 'setScale');
      model.setScale(value);

      expect(spy).toHaveBeenCalled();
      expect(model.state.scale).toBe(expected);

      spy.mockRestore();
    }
  );
});

describe('Model: getScale', () => {
  const model = new Model();

  test('must return a value of the scale', () => {
    const spy = jest.spyOn(model, 'getScale');
    const originalScale = model.state.scale;

    const isScale = model.getScale();

    expect(spy).toHaveBeenCalled();
    expect(isScale).toBe(originalScale);
  });
});

describe('Model: setLimits', () => {
  let model;
  const limits = {
    min: 0,
    max: 100,
  };

  beforeEach(() => {
    model = new Model();
  });

  test.each([
    { min: undefined, max: undefined, expected: limits },
    { min: NaN, max: 'one', expected: limits },
    { min: 50, max: undefined, expected: { min: 50, max: 100 } },
    { min: 2, max: 2, expected: limits },
    { min: 40, max: 5, expected: { min: 5, max: 40 } },
    { min: 0, max: 6, expected: { min: 0, max: 6 } },
    { min: 1.2, max: 22.5, expected: { min: 1, max: 23 } },
  ])(
    'must assign valid min and max values. Add values min: $min, max: $max',
    ({ min, max, expected }) => {
      const spy = jest.spyOn(model, 'setLimits');
      model.setLimits(min, max);

      const limitsAfterCall = {
        min: model.state.min,
        max: model.state.max,
      };

      expect(spy).toHaveBeenCalled();
      expect(limitsAfterCall).toEqual(expected);

      spy.mockRestore();
    }
  );
});
