import DEFAULT_CONFIG from '../lib/defaultConfig';
import { ILimitCoords, IStateModel } from '../lib/interfaces';
import Calculation from './Calculation';
import View from './View';

const options: IStateModel = { ...DEFAULT_CONFIG };
const data = {
  percentPerPx: 0,
  percentPerPosition: 0,
  percentageLimitSize: 0,
  fractionLength: 0,
};
const mockLineGetSize = jest.fn().mockReturnValue(100);
const mockFromThumbGetSize = jest.fn().mockReturnValue(10);
const mockFromThumbGetPercentPosition = jest.fn().mockReturnValue(30);
const mockToThumbGetPercentPosition = jest.fn().mockReturnValue(60);

jest.mock('./View', () =>
  jest.fn().mockImplementation(() => ({
    data,
    options,
    line: {
      getSize: mockLineGetSize,
    },
    fromThumb: {
      getSize: mockFromThumbGetSize,
      getPercentPosition: mockFromThumbGetPercentPosition,
    },
    toThumb: {
      getPercentPosition: mockToThumbGetPercentPosition,
    },
  }))
);

let calculation: Calculation;

beforeEach(() => {
  mockLineGetSize.mockClear();
  mockFromThumbGetSize.mockClear();
  mockFromThumbGetPercentPosition.mockClear();
  mockToThumbGetPercentPosition.mockClear();

  const el = document.createElement('div');
  calculation = new Calculation(new View(el, options));
});

describe('Calculation: convertLinePxToPercent', () => {
  test('should call the getSize method of the LineView', () => {
    calculation.makeBaseCalc();
    expect(mockLineGetSize).toBeCalled();
  });
  test('must assign a value to the property percentPerPx of the data', () => {
    const result = 1;
    calculation.makeBaseCalc();
    expect(data.percentPerPx).toBe(result);
  });
});

describe('Calculation: calcLimitSizeOfLine', () => {
  test('should call the getSize method of the LineView', () => {
    calculation.makeBaseCalc();
    expect(mockFromThumbGetSize).toBeCalled();
  });
  test('must assign a value to the property percentageLimitSize of the data', () => {
    const result = 90;
    calculation.makeBaseCalc();
    expect(data.percentageLimitSize).toBe(result);
  });
});

test('Calculation: calcPercentPerPosition must assign a value to the property percentPerPosition of the data', () => {
  const result = 0.9;
  calculation.makeBaseCalc();
  expect(data.percentPerPosition).toBe(result);
});

test('Calculation: calcFractionLength should return the number of decimal places', () => {
  options.step = 0.1;
  options.isDouble = true;
  calculation.makeBaseCalc();
  expect(data.fractionLength).toBe(1);
});

describe('Calculation: getLimitCoords', () => {
  test('should call the getPercentPosition method of fromThumb and toThumb', () => {
    calculation.getLimitCoords('from');
    expect(mockFromThumbGetPercentPosition).toBeCalled();
    expect(mockToThumbGetPercentPosition).toBeCalled();
  });

  test('should return the corresponding object with the option isDouble: false', () => {
    const result: ILimitCoords = {
      start: 0,
      end: 90,
    };
    options.isDouble = false;
    const coords = calculation.getLimitCoords('from');

    expect(coords).toEqual(result);
  });

  test('should return the corresponding object with the option isDouble: true', () => {
    options.isDouble = true;
    const resultForFrom: ILimitCoords = {
      start: 0,
      end: 60,
    };
    const resultForTo: ILimitCoords = {
      start: 30,
      end: 90,
    };
    const coordsForFrom = calculation.getLimitCoords('from');
    const coordsForTo = calculation.getLimitCoords('to');

    expect(coordsForFrom).toEqual(resultForFrom);
    expect(coordsForTo).toEqual(resultForTo);
  });
});
