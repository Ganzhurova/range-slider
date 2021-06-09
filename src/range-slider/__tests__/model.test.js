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
  const { vertical } = model.settings;

  test.each([
    { value: 1, expected: vertical },
    { value: 'string', expected: vertical },
  ])(
    'the vertical value should not change. Add invalid value $value',
    ({ value, expected }) => {
      const spy = jest.spyOn(model, 'setVertical');
      model.setVertical(value);

      expect(spy).toHaveBeenCalled();
      expect(model.settings.vertical).toBe(expected);

      spy.mockRestore();
    }
  );

  test.each([
    { value: true, expected: true },
    { value: false, expected: false },
  ])(
    'must change the vertical. Add a valid value $value',
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
