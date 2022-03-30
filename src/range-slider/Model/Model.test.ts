import Model from './Model';

test('Model: updateState should return an object with the changed property', () => {
  const options = {
    isDouble: true,
  };
  const model = new Model(options);
  expect(model.getState()).not.toHaveProperty('isDouble', false);
  expect(model.getState()).toHaveProperty('isDouble', true);
});

describe('Model: updatePosition', () => {
  let model: Model;

  beforeEach(() => {
    model = new Model({});
  });

  test('should update position from', () => {
    model.updatePosition(10, 'from');
    expect(model.getState()).not.toHaveProperty('from', 25);
    expect(model.getState()).toHaveProperty('from', 10);
  });

  test('should update position to', () => {
    model.updatePosition(90, 'to');
    expect(model.getState()).not.toHaveProperty('to', 75);
    expect(model.getState()).toHaveProperty('to', 90);
  });
});

describe('Model: validateLimits', () => {
  let model: Model;

  beforeEach(() => {
    model = new Model({});
  });

  test('should increase max by 1 if limits are equal', () => {
    const options = {
      min: 10,
      max: 10,
    };
    model.updateState(options);
    expect(model.getState()).not.toHaveProperty('max', 10);
    expect(model.getState()).toHaveProperty('max', 11);
  });

  test('should swap min and max if min is greater than max', () => {
    const options = {
      min: 15,
      max: 8,
    };
    model.updateState(options);
    expect(model.getState()).not.toHaveProperty('min', 15);
    expect(model.getState()).toHaveProperty('min', 8);
    expect(model.getState()).not.toHaveProperty('max', 8);
    expect(model.getState()).toHaveProperty('max', 15);
  });
});

test('Model: ValidatePos should swap positions if to is greater than from', () => {
  const options = {
    isDouble: true,
    from: 50,
    to: 20,
  };
  const model = new Model(options);
  expect(model.getState()).not.toHaveProperty('from', 50);
  expect(model.getState()).toHaveProperty('from', 20);
  expect(model.getState()).not.toHaveProperty('to', 20);
  expect(model.getState()).toHaveProperty('to', 50);
});

test('Model: ValidateScaleParts should return an integer', () => {
  const options = {
    scaleParts: 3.5,
  };
  const model = new Model(options);
  expect(model.getState()).not.toHaveProperty('scaleParts', 3.5);
  expect(model.getState()).toHaveProperty('scaleParts', 4);
});
