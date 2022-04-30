import { directions } from '../lib/constants';
import DEFAULT_CONFIG from '../lib/defaultConfig';
import { IStateModel } from '../lib/interfaces';
import Template from './Template';
import View from './View';

const options: IStateModel = { ...DEFAULT_CONFIG };
const data = {
  direction: directions.LEFT,
};

const mockRootAddChild = jest.fn();
const mockRootSetDirection = jest.fn();
const mockLineAddChild = jest.fn();
const mockToThumbRemove = jest.fn();
const mockFromLabelRemove = jest.fn();
const mockToLabelRemove = jest.fn();
const mockCommonLabelRemove = jest.fn();
const mockScaleRemove = jest.fn();

const root = {
  addChild: mockRootAddChild,
  setDirection: mockRootSetDirection,
};
const line = {
  addChild: mockLineAddChild,
};
const bar = {};
const fromThumb = {};
const toThumb = {
  isElExists: false,
  remove: mockToThumbRemove,
};
const fromLabel = {
  remove: mockFromLabelRemove,
};
const toLabel = {
  remove: mockToLabelRemove,
};
const commonLabel = {
  remove: mockCommonLabelRemove,
};
const scale = {
  remove: mockScaleRemove,
};

jest.mock('./View', () =>
  jest.fn().mockImplementation(() => ({
    options,
    data,
    root,
    line,
    bar,
    fromThumb,
    toThumb,
    fromLabel,
    toLabel,
    commonLabel,
    scale,
  }))
);

let template: Template;

beforeEach(() => {
  mockRootAddChild.mockClear();
  mockRootSetDirection.mockClear();
  mockLineAddChild.mockClear();
  mockToThumbRemove.mockClear();
  mockFromLabelRemove.mockClear();
  mockToLabelRemove.mockClear();
  mockCommonLabelRemove.mockClear();
  mockScaleRemove.mockClear();

  const el = document.createElement('div');
  template = new Template(new View(el, options));
});

test('Template: init should call the addChild method of root and line', () => {
  expect(mockLineAddChild).toBeCalledWith(bar);
  expect(mockLineAddChild).toBeCalledWith(fromThumb);
  expect(mockRootAddChild).toBeCalledWith(line);
});

describe('Template: setDirection', () => {
  test('should call the setDirection method of root', () => {
    template.update(['isVertical']);
    expect(mockRootSetDirection).toBeCalled();
  });
  test('should set the correct direction', () => {
    options.isVertical = true;
    template.update(['isVertical']);
    expect(data.direction).toEqual(directions.TOP);

    options.isVertical = false;
    template.update(['isVertical']);
    expect(data.direction).toEqual(directions.LEFT);
  });
});

describe('Template: setType should call the methods of line or toThumb', () => {
  test('state - isDouble: false', () => {
    options.isDouble = false;
    template.update(['isDouble']);
    expect(mockToThumbRemove).toBeCalled();
  });
  test('state - isDouble: true', () => {
    options.isDouble = true;
    template.update(['isDouble']);
    expect(mockLineAddChild).toBeCalledWith(toThumb);
  });
});

describe('Template: setLabel should call the methods of subViews', () => {
  test('state - isLabel: false', () => {
    options.isLabel = false;
    template.update(['isLabel']);
    expect(mockFromLabelRemove).toBeCalled();
    expect(mockToLabelRemove).toBeCalled();
  });
  test('state - isDouble: false, isLabel: true', () => {
    options.isLabel = true;
    template.update(['isLabel']);
    expect(mockLineAddChild).toBeCalledWith(fromLabel);
    expect(mockCommonLabelRemove).toBeCalled();
    expect(mockToLabelRemove).toBeCalled();
  });
  test('state - isDouble: true, isLabel: true', () => {
    toThumb.isElExists = true;
    options.isLabel = true;
    template.update(['isLabel']);
    expect(mockLineAddChild).toBeCalledWith(commonLabel);
    expect(mockLineAddChild).toBeCalledWith(toLabel);
  });

  describe('Template: setScale', () => {
    test('should show scale', () => {
      options.isScale = true;
      template.update(['isScale']);
      expect(mockRootAddChild).toBeCalledWith(scale);
    });
    test('should remove scale', () => {
      options.isScale = false;
      template.update(['isScale']);
      expect(mockScaleRemove).toBeCalled();
    });
  });
});
