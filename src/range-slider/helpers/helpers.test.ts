import helpers from './helpers';

describe('helpers: getEventCoord should return the appropriate coordinate', () => {
  test('mouseEvent', () => {
    const mouseEvent = <MouseEvent>{
      type: 'click',
      pageX: 100,
      pageY: 55,
    };
    const resultX = helpers.getEventCoord(mouseEvent, 'X');
    const expectedX = 100;

    expect(resultX).toBe(expectedX);

    const resultY = helpers.getEventCoord(mouseEvent, 'Y');
    const expectedY = 55;

    expect(resultY).toBe(expectedY);
  });

  test('touchEvent', () => {
    const touch = <Touch>{ pageX: 100, pageY: 55 };
    const touchEvent = <TouchEvent>{
      type: 'touchstart',
      touches: {},
    };
    touchEvent.touches[0] = touch;

    const resultX = helpers.getEventCoord(touchEvent, 'X');
    const expectedX = 100;

    expect(resultX).toBe(expectedX);

    const resultY = helpers.getEventCoord(touchEvent, 'Y');
    const expectedY = 55;

    expect(resultY).toBe(expectedY);
  });
});

describe('helpers: getClosestValue', () => {
  let numbers: number[];

  beforeEach(() => {
    numbers = [7, 2];
  });

  test('should return the first number from the array', () => {
    const target = 5;

    const result = helpers.getClosestValue(numbers, target);
    const expected = 7;

    expect(result).toBe(expected);
  });

  test('should return the second number from the array', () => {
    const target = 4;

    const result = helpers.getClosestValue(numbers, target);
    const expected = 2;

    expect(result).toBe(expected);
  });
});
