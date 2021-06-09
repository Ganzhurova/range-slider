import Model from '../Model/Model';

describe('Model: setType', () => {
  const model = new Model();
  const { type } = model.settings;

  test.each([
    { value: 1, expected: type },
    { value: true, expected: type },
    { value: 'string', expected: type },
  ])(
    'the type value should not change. Add invalid value $value',
    ({ value, expected }) => {
      const spy = jest.spyOn(model, 'setType');
      model.setType(value);

      expect(spy).toHaveBeenCalled();
      expect(model.settings.type).toBe(expected);

      spy.mockRestore();
    }
  );

  test.each([
    { value: 'double', expected: 'double' },
    { value: 'single', expected: 'single' },
  ])(
    'must change the type. Add a valid value $value',
    ({ value, expected }) => {
      const spy = jest.spyOn(model, 'setType');
      model.setType(value);

      expect(spy).toHaveBeenCalled();
      expect(model.settings.type).toBe(expected);

      spy.mockRestore();
    }
  );
});
