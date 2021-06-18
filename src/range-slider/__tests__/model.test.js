import Model from '../Model/Model';
import types from '../lib/constants';

describe('Model: getState', () => {
  let model;

  const options = {
    type: 'double',
    isVertical: true,
    isLabel: true,
    isScale: true,
  };

  beforeEach(() => {
    model = new Model(options);
  });

  test('should return the current state of the model', () => {
    const spy = jest.spyOn(model, 'getState');
    const state = model.getState();
    const expected = {
      type: types.DOUBLE,
      isVertical: true,
      isLabel: true,
      isScale: true,
      min: 0,
      max: 100,
      from: 50,
      to: 100,
      step: 25,
      scaleRange: [0, 25, 50, 75, 100],
      isDouble: true,
    };

    expect(spy).toHaveBeenCalled();
    expect(state).toEqual(expected);

    spy.mockRestore();
  });
});
