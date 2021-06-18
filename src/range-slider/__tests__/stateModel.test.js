import stateModel from '../Model/stateModel';

describe('stateModel: validateLimits', () => {
  test.each([
    { min: 0, max: 0, expected: { min: 0, max: 1 } },
    { min: -5, max: -5, expected: { min: -5, max: -4 } },
    { min: 0.01, max: 0.01, expected: { min: 0.01, max: 1.01 } },
  ])(
    'if the values ​​are equal, increase max by 1. Add values min: $min, max: $max',
    ({ min, max, expected }) => {
      const spy = jest.spyOn(stateModel, 'validateLimits');
      stateModel.set({ min, max });
      const limits = {
        min: stateModel.state.min,
        max: stateModel.state.max,
      };

      expect(spy).toHaveBeenCalled();
      expect(limits).toEqual(expected);

      spy.mockRestore();
    }
  );

  test.each([
    { min: 6, max: 1, expected: { min: 1, max: 6 } },
    { min: -5, max: -15, expected: { min: -15, max: -5 } },
    { min: 0.1, max: 0.01, expected: { min: 0.01, max: 0.1 } },
  ])(
    'should swap values ​​if min is greater than max. Add values min: $min, max: $max',
    ({ min, max, expected }) => {
      const spy = jest.spyOn(stateModel, 'validateLimits');
      stateModel.set({ min, max });
      const limits = {
        min: stateModel.state.min,
        max: stateModel.state.max,
      };

      expect(spy).toHaveBeenCalled();
      expect(limits).toEqual(expected);

      spy.mockRestore();
    }
  );
});

describe('stateModel: validatePos', () => {
  test('must assign limit values ​​if position values ​​are equal', () => {
    const spy = jest.spyOn(stateModel, 'validatePos');
    stateModel.set({ type: 'double', min: 10, max: 60, from: 50, to: 50 });
    const pos = {
      from: stateModel.state.from,
      to: stateModel.state.to,
    };

    const expected = {
      from: 10,
      to: 60,
    };

    expect(spy).toHaveBeenCalled();
    expect(pos).toEqual(expected);

    spy.mockRestore();
  });

  test('should swap values ​​if from is greater than to', () => {
    const spy = jest.spyOn(stateModel, 'validatePos');
    stateModel.set({ type: 'double', min: 10, max: 60, from: 40, to: 10 });
    const pos = {
      from: stateModel.state.from,
      to: stateModel.state.to,
    };

    const expected = {
      from: 10,
      to: 40,
    };

    expect(spy).toHaveBeenCalled();
    expect(pos).toEqual(expected);

    spy.mockRestore();
  });
});

describe('stateModel: calcScaleRange', () => {
  test('shuld calculate the values ​​for the scale. First value = min, last value = max', () => {
    const spy = jest.spyOn(stateModel, 'calcScaleRange');
    stateModel.set({ isScale: true, min: 10, max: 30, step: 5.5 });
    const range = stateModel.state.scaleRange;
    const expected = [10, 15.5, 21, 26.5, 30];

    expect(spy).toHaveBeenCalled();
    expect(range).toEqual(expected);

    spy.mockRestore();
  });
});
