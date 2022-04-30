import Component from './Component';
import { HTML } from '../lib/html';
import { directions } from '../lib/constants';
import { Settings } from '../lib/interfaces';
import DEFAULT_CONFIG from '../lib/defaultConfig';

type Modified<T> = {
  -readonly [P in keyof T]+?: T[P];
};

let component: Component;
let element: HTMLElement;

const settings: Settings = {
  data: {
    direction: directions.LEFT,
    percentPerPx: 2,
    percentPerPosition: 5,
    percentageLimitSize: 0,
    fractionLength: 0,
  },
  options: { ...DEFAULT_CONFIG },
};

beforeEach(() => {
  component = new Component(HTML.rootEl, settings);
  element = component.getEl();
});

describe('Component: init', () => {
  test('should create an element', () => {
    expect(element).toBeTruthy();
  });

  test('should create an element with the given class', () => {
    expect(element.className).toBe(HTML.rootEl.className);
  });

  test('should create an element with the given tag', () => {
    expect(element.tagName).toBe(HTML.rootEl.tag.toUpperCase());
  });
});

test('Component: removeClass should remove the given class', () => {
  component.removeClass(HTML.rootEl.className);
  element = component.getEl();

  expect(!element.classList.contains(HTML.rootEl.className)).toBeTruthy();
});

describe('Tests for child elements', () => {
  let child: Component;

  beforeEach(() => {
    child = new Component(HTML.line, settings);
    component.addChild(child);
  });

  test('Component: addChild should add a child element', () => {
    element = component.getEl();

    for (let i = 0; i < element.children.length; i = +1) {
      expect(element.children[i]).toEqual(child.getEl());
    }
  });

  test('Component: remove should remove the element from the parent', () => {
    child.remove();
    element = component.getEl();

    for (let i = 0; i < element.children.length; i = +1) {
      expect(element.children[i]).not.toEqual(child.getEl());
    }
  });
});

test('Component: hidden should hide the element', () => {
  component.hidden();
  element = component.getEl();

  expect(element.style.visibility).toBe('hidden');
});

test('Component: show should show the element', () => {
  component.show();
  element = component.getEl();

  expect(element.style.visibility).toBe('');
});

test('Component: getSize should return DomRect size', () => {
  const domRect = {
    width: 150,
    height: 200,
    x: 40,
    y: 60,
    left: 40,
    bottom: 75,
    right: 87,
    top: 91,
    toJSON: jest.fn(),
  };
  const mockGetBoundingClientRect = jest.fn(() => domRect);
  element = component.getEl();
  element.getBoundingClientRect = mockGetBoundingClientRect;

  const result = component.getSize();

  expect(mockGetBoundingClientRect).toBeCalled();
  expect(result).toBe(150);
});

test('Component: getCoord should return the coordinate of the element', () => {
  const domRect = {
    width: 150,
    height: 200,
    x: 40,
    y: 60,
    left: 40,
    bottom: 75,
    right: 87,
    top: 91,
    toJSON: jest.fn(),
  };
  const mockGetBoundingClientRect = jest.fn(() => domRect);
  element = component.getEl();
  element.getBoundingClientRect = mockGetBoundingClientRect;

  const mockPageXOffset = jest.fn(() => 43);
  const { pageXOffset } = window;

  delete (window as Modified<Window>).pageXOffset;
  window.pageXOffset = mockPageXOffset();

  const result = component.getCoord();

  expect(mockGetBoundingClientRect).toBeCalled();
  expect(mockPageXOffset).toBeCalled();
  expect(result).toBe(83);

  window.pageXOffset = pageXOffset;
});

describe('Component: static checkOverlay', () => {
  let componentA: Component;
  let componentB: Component;

  beforeEach(() => {
    componentA = new Component(HTML.label, settings);
    componentB = new Component(HTML.label, settings);

    componentA.getCoord = jest.fn(() => 100);
    componentA.getSize = jest.fn(() => 50);
  });

  test('should return true', () => {
    componentB.getCoord = jest.fn(() => 130);

    const isOverlay = Component.checkOverlay(componentA, componentB);
    expect(isOverlay).toBe(true);
  });

  test('should return false', () => {
    componentB.getCoord = jest.fn(() => 170);

    const isOverlay = Component.checkOverlay(componentA, componentB);
    expect(isOverlay).toBe(false);
  });
});

test('Component: positionToPercent should return the correct value', () => {
  const position = 5;
  const result = position * settings.data.percentPerPosition;
  const percent = component.positionToPercent(position);
  expect(percent).toBe(result);
});

test('Component: percentToPosition should return the correct value', () => {
  const percent = 15;
  const result = percent / settings.data.percentPerPosition;
  const position = component.percentToPosition(percent);
  expect(position).toBe(result);
});

test('Component: percentToPx should return the correct value', () => {
  const percent = 10;
  const result = percent / settings.data.percentPerPx;
  const px = component.percentToPx(percent);
  expect(px).toBe(result);
});

test('Component: pxToPercent should return the correct value', () => {
  const px = 10;
  const result = px * settings.data.percentPerPx;
  const percent = component.pxToPercent(px);
  expect(percent).toBe(result);
});
