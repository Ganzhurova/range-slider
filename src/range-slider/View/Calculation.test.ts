import { IOptions } from '../lib/interfaces';
import Calculation from './Calculation';
import View from './View';

const mockLineGetSize = jest.fn().mockReturnValue(100);
const mockFromThumbGetSize = jest.fn().mockReturnValue(10);

jest.mock('./View', () =>
  jest.fn().mockImplementation(() => ({
    line: {
      getSize: mockLineGetSize,
    },
    fromThumb: {
      getSize: mockFromThumbGetSize,
    },
  }))
);

let calculation: Calculation;
let options: IOptions;

beforeEach(() => {
  mockLineGetSize.mockClear();
  mockFromThumbGetSize.mockClear();

  calculation = new Calculation(new View(''));
  options = {
    isDouble: true,
    isVertical: false,
    isLabel: false,
    isScale: false,
    min: 0,
    max: 100,
    from: 10.1,
    to: 28.9,
    step: 4,
    scaleParts: 4,
  };
});

test('Calculation: makeBaseCalc should call the getSize method of the LineView or ThumbView class instance', () => {
  calculation.makeBaseCalc(options);
  expect(mockLineGetSize).toBeCalled();
  expect(mockFromThumbGetSize).toBeCalled();
});

test('Calculation: calcFractionLength should return the number of decimal places', () => {
  calculation.calcFractionLength(options);
  expect(calculation.fractionLength).toBe(1);
});

test('Calculation: positionToPercent should return the correct number', () => {
  calculation.makeBaseCalc(options);
  const result = calculation.positionToPercent(10);
  expect(result).toBe(9);
});

test('Calculation: percentToPosition should return the correct number', () => {
  calculation.makeBaseCalc(options);
  const result = calculation.percentToPosition(90);
  expect(result).toBe(100);
});
