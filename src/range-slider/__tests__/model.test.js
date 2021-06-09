import Model from '../Model/Model';

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
      expect(model.settings.type).toBe(expected);

      spy.mockRestore();
    }
  );
});

describe('Model: getType', () => {
  const model = new Model();

  test('must return a value of the type', () => {
    const spy = jest.spyOn(model, 'getType');
    const originalType = model.settings.type;

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
      expect(model.settings.vertical).toBe(expected);

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
    const originalVertical = model.settings.vertical;

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
      expect(model.settings.label).toBe(expected);

      spy.mockRestore();
    }
  );
});

describe('Model: getLabel', () => {
  const model = new Model();

  test('must return a value of the label', () => {
    const spy = jest.spyOn(model, 'getLabel');
    const originalLabel = model.settings.label;

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
      expect(model.settings.scale).toBe(expected);

      spy.mockRestore();
    }
  );
});

describe('Model: getScale', () => {
  const model = new Model();

  test('must return a value of the scale', () => {
    const spy = jest.spyOn(model, 'getScale');
    const originalScale = model.settings.scale;

    const isScale = model.getScale();

    expect(spy).toHaveBeenCalled();
    expect(isScale).toBe(originalScale);
  });
});
