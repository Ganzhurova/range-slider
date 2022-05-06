import { directions } from '../../lib/constants';
import DEFAULT_CONFIG from '../../lib/defaultConfig';
import { HTML, mix } from '../../lib/html';
import { ILimitCoords, Settings } from '../../lib/interfaces';
import LineView from './LineView';
import ThumbView from './ThumbView';

let thumb: ThumbView;
let thumbEl: HTMLElement;
const options = { ...DEFAULT_CONFIG };

const settings: Settings = {
  data: {
    direction: directions.LEFT,
    percentPerPx: 2,
    percentPerPosition: 0.5,
    percentageLimitSize: 0,
    fractionLength: 0,
  },
  options,
};
const line = new LineView(HTML.line, settings);

beforeEach(() => {
  thumb = new ThumbView(HTML.thumb, settings);
  line.addChild(thumb);
  thumbEl = thumb.getEl();
});

test('ThumbView: setPercentPosition and getPercentPosition should set and return percent position value', () => {
  const percentPosition = 50;
  thumb.setPercentPosition(percentPosition);
  expect(thumb.getPercentPosition()).toBe(percentPosition);
});

test('ThumbView: getPosition should return position value', () => {
  const percent = 10;
  thumb.setPercentPosition(percent);
  const position = thumb.getPosition();
  const result = 20;
  expect(position).toBe(result);
});

describe('ThumbView: setup', () => {
  test('should set the correct percent position', () => {
    thumb.setup('from');
    const percent = thumb.getPercentPosition();
    const result = 12.5;
    expect(percent).toBe(result);
  });

  test('must exit the method if the element is not in the markup', () => {
    thumb.remove();
    thumb.setup('from');
    const result = 0;
    expect(thumb.getPercentPosition()).toBe(result);
  });
});

describe('ThumbView: update', () => {
  test('should set style attribute', () => {
    thumb.update();
    const isStyle = thumbEl.hasAttribute('style');
    expect(isStyle).toBeTruthy();
  });

  test('must exit the method if the element is not in the markup', () => {
    thumb.remove();
    thumb.update();
    const isStyle = thumbEl.hasAttribute('style');
    expect(isStyle).toBeFalsy();
  });
});

describe('ThumbView: handlerThumbDragStart', () => {
  let limitCoords: ILimitCoords;
  let mouseDownEvent: MouseEvent;
  let mouseMoveEvent: MouseEvent;

  beforeEach(() => {
    limitCoords = {
      start: 0,
      end: 0,
    };
    mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });
    mouseMoveEvent = new MouseEvent('mousemove', {
      cancelable: true,
    });
    line.getEl().addEventListener('mousedown', (event) => {
      thumb.handlerThumbDragStart(event, limitCoords);
    });
  });

  test('method should handle the mousedown event', () => {
    const spyHandler = jest.spyOn(ThumbView.prototype, 'handlerThumbDragStart');

    const mouseUpEvent = new MouseEvent('mouseup', {
      cancelable: true,
    });

    thumbEl.dispatchEvent(mouseDownEvent);
    document.dispatchEvent(mouseMoveEvent);
    document.dispatchEvent(mouseUpEvent);

    expect(spyHandler).toBeCalled();
    spyHandler.mockRestore();
  });

  test('should add a class "selected" to the active element', () => {
    thumbEl.dispatchEvent(mouseDownEvent);
    expect(thumbEl.classList.contains(mix.selected)).toBeTruthy();
  });

  test('should remove the class "selected" from the inactive element', () => {
    const otherThumb = new ThumbView(HTML.thumb, settings);
    line.addChild(otherThumb);
    thumbEl.dispatchEvent(mouseDownEvent);
    otherThumb.getEl().dispatchEvent(mouseDownEvent);

    expect(thumbEl.classList.contains(mix.selected)).toBeFalsy();
  });

  describe('uses options.step in calculations', () => {
    let spyPositionToPercent: jest.SpyInstance<number, [position: number]>;

    beforeEach(() => {
      spyPositionToPercent = jest.spyOn(thumb, 'positionToPercent');
    });
    test('options.step = 0', () => {
      options.step = 0;

      thumbEl.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);

      expect(spyPositionToPercent).toBeCalled();
      expect(spyPositionToPercent).toBeCalledWith(options.step);
      expect(spyPositionToPercent).toReturnWith(0);
      spyPositionToPercent.mockRestore();
    });

    test('options.step > 0', () => {
      options.step = 10;

      thumbEl.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);

      expect(spyPositionToPercent).toBeCalled();
      expect(spyPositionToPercent).toBeCalledWith(options.step);
      expect(spyPositionToPercent).toReturnWith(5);
      spyPositionToPercent.mockRestore();
    });
  });

  describe('should get the valid coordinate', () => {
    let spyPxToPercent: jest.SpyInstance<number, [px: number]>;

    beforeEach(() => {
      spyPxToPercent = jest.spyOn(thumb, 'pxToPercent');
      limitCoords = {
        start: 10,
        end: 20,
      };
      thumb.setPercentPosition(15);
    });

    test('coord less than limitCoords.start', () => {
      spyPxToPercent.mockReturnValue(5);

      thumbEl.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);

      expect(spyPxToPercent).toBeCalled();
      expect(thumb.getPercentPosition()).toBe(limitCoords.start);
      spyPxToPercent.mockRestore();
    });

    test('coord more than limitCoords.end', () => {
      spyPxToPercent.mockReturnValue(-5);

      thumbEl.dispatchEvent(mouseDownEvent);
      document.dispatchEvent(mouseMoveEvent);

      expect(spyPxToPercent).toBeCalled();
      expect(thumb.getPercentPosition()).toBe(limitCoords.end);
      spyPxToPercent.mockRestore();
    });
  });
});
