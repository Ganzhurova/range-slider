import { directions } from '../../lib/constants';
import DEFAULT_CONFIG from '../../lib/defaultConfig';
import { HTML } from '../../lib/html';
import { Settings } from '../../lib/interfaces';
import Component from '../Component';
import RootView from './RootView';
import ScaleView from './ScaleView';

let scale: ScaleView;
let scaleEl: HTMLElement;
let scaleValuesEl: HTMLElement[];

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
const root = new RootView(HTML.rootEl, settings);

beforeEach(() => {
  scale = new ScaleView(HTML.scale, settings);
  root.addChild(scale);
  scale.renderDivisions();
  scaleEl = scale.getEl();
  scaleValuesEl = <HTMLElement[]>(
    [...scaleEl.children].filter((child) =>
      child.classList.contains(HTML.scaleValue.className)
    )
  );
});

describe('ScaleView: rederDivisions', () => {
  test('should add child elements', () => {
    expect(scaleEl.hasChildNodes).toBeTruthy();
  });

  test('must exit the method if the scale element is not in the markup', () => {
    scale.remove();
    scale.renderDivisions();
    expect(scaleEl.hasChildNodes).toBeTruthy();
  });
});

describe('ScaleView: setup', () => {
  test('state - scale element does not exist in html markup. The scale element must not have a style attribute', () => {
    scale.remove();
    scale.setup();
    const isStyle = scaleEl.hasAttribute('style');
    expect(isStyle).toBeFalsy();
  });

  test('state - scale element exist in html markup. The scale element must have a style attribute', () => {
    scale.setup();
    const isStyle = scaleEl.hasAttribute('style');
    expect(isStyle).toBeTruthy();
  });

  test('should show scale values if they do not overlap', () => {
    ScaleView.checkOverlay = jest.fn().mockReturnValue(false);
    scale.setup();
    scaleValuesEl.forEach((valueEl) => {
      expect(valueEl.style.visibility).toBeFalsy();
    });
  });

  test('should hide scale value element if there is overlap', () => {
    ScaleView.checkOverlay = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);
    scale.setup();

    expect(ScaleView.checkOverlay).toBeCalled();
    expect(scaleValuesEl[0].style.visibility).toBeFalsy();
    expect(scaleValuesEl[1].style.visibility).toBeTruthy();
  });

  test('should hide the penultimate element of the scale value', () => {
    ScaleView.checkOverlay = jest.fn().mockReturnValue(true);
    scale.setup();
    const penultValueEl = scaleValuesEl[scaleValuesEl.length - 2];

    expect(penultValueEl.style.visibility).toBeTruthy();
  });

  test('should shift the last element if the overlap is less than one third of the element size', () => {
    ScaleView.checkOverlay = jest.fn().mockReturnValue(true);
    const mockGetSize = jest.fn().mockReturnValue(20);
    const mockGetCoord = jest
      .fn()
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(69);
    const getSizeMock = jest
      .spyOn(Component.prototype, 'getSize')
      .mockImplementation(mockGetSize);
    const getCoordMock = jest
      .spyOn(Component.prototype, 'getCoord')
      .mockImplementation(mockGetCoord);
    const firstValueEl = scaleValuesEl[0];
    const lastValueEl = scaleValuesEl[scaleValuesEl.length - 1];
    const baseTransformStyle = `translate${settings.data.direction.coord.toUpperCase()}(-50%)`;

    scale.setup();

    expect(getSizeMock).toBeCalled();
    expect(getCoordMock).toBeCalled();
    expect(firstValueEl.style.visibility).toBeFalsy();
    expect(lastValueEl.style.transform).not.toBe(baseTransformStyle);

    getSizeMock.mockRestore();
    getCoordMock.mockRestore();
  });
});

describe('ScaleView: handlerScaleValueClick', () => {
  let spyHandler: jest.SpyInstance<void, [event: MouseEvent | TouchEvent]>;
  let clickMouseEvent: MouseEvent;
  beforeEach(() => {
    spyHandler = jest.spyOn(scale, 'handlerScaleValueClick');
    clickMouseEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
  });
  test('method should handle the click event', () => {
    const valueEl = scaleValuesEl[0];
    valueEl.addEventListener('click', (event) => {
      scale.handlerScaleValueClick(event);
    });
    valueEl.dispatchEvent(clickMouseEvent);

    expect(spyHandler).toBeCalled();
  });

  test('must exit the method if the event occurred on a non-scale value element', () => {
    const el = document.createElement('div');
    el.addEventListener('click', (event) => {
      scale.handlerScaleValueClick(event);
    });
    el.dispatchEvent(clickMouseEvent);

    expect(spyHandler).toBeCalled();
  });
});
