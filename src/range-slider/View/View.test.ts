import { Events } from '../lib/constants';
import DEFAULT_CONFIG from '../lib/defaultConfig';
import { OptionsKeys, PositionKeys } from '../lib/types';
import Template from './Template';
import Calculation from './Calculation';
import View from './View';

let view: View;
let options = { ...DEFAULT_CONFIG };
const el = document.createElement('div');

beforeEach(() => {
  options = { ...DEFAULT_CONFIG };
  view = new View(el, options);
});

describe('View: subscribeToThumbEvent', () => {
  test('should update the position in the options', () => {
    const key: PositionKeys = 'from';
    const percent = 16;
    const spyGetPosition = jest
      .spyOn(view.fromThumb, 'getPosition')
      .mockImplementation(jest.fn().mockReturnValue(percent));

    view.fromThumb.emit(Events.NEW_PERCENT_POSITION);

    expect(spyGetPosition).toBeCalled();
    expect(options[key]).toBe(percent);
    spyGetPosition.mockRestore();
  });
});

describe('View: subscribeToScaleEvent should set the percent position of the closest thumb', () => {
  test('state - isDouble: false', () => {
    const percentPosition = 10;
    view.scale.emit(Events.NEW_PERCENT_POSITION, percentPosition);

    expect(view.fromThumb.getPercentPosition()).toBe(percentPosition);
  });

  describe('state - isDouble: true', () => {
    beforeEach(() => {
      view.options.isDouble = true;
      view.fromThumb.setPercentPosition(25);
      view.toThumb.setPercentPosition(75);
    });

    test('got the position in front of the fromThumb', () => {
      const percentPosition = 7;
      view.scale.emit(Events.NEW_PERCENT_POSITION, percentPosition);

      expect(view.fromThumb.getPercentPosition()).toBe(percentPosition);
    });

    test('got the position after the toThumb', () => {
      const percentPosition = 82;
      view.scale.emit(Events.NEW_PERCENT_POSITION, percentPosition);

      expect(view.toThumb.getPercentPosition()).toBe(percentPosition);
    });
  });
});

describe('checking event handlers', () => {
  test('handlerUpdateOnResize', () => {
    const resizeEvent = new UIEvent('resize');
    const spyMakeBaseCalc = jest.spyOn(Calculation.prototype, 'makeBaseCalc');

    window.dispatchEvent(resizeEvent);

    expect(spyMakeBaseCalc).toBeCalled();
    spyMakeBaseCalc.mockRestore();
  });

  test('handlerThumbDragStart', () => {
    const limitCoords = { start: 0, end: 0 };
    const mouseEvent = new MouseEvent('mousedown', {});
    const spyFromThumbHandler = jest.spyOn(
      view.fromThumb,
      'handlerThumbDragStart'
    );
    const spyToThumbHandler = jest.spyOn(view.toThumb, 'handlerThumbDragStart');
    const spyGetLimitCoords = jest
      .spyOn(Calculation.prototype, 'getLimitCoords')
      .mockImplementation(jest.fn().mockReturnValue(limitCoords));

    el.dispatchEvent(mouseEvent);

    expect(spyFromThumbHandler).toBeCalled();
    expect(spyFromThumbHandler).toBeCalledWith(mouseEvent, limitCoords);
    expect(spyToThumbHandler).toBeCalled();
    expect(spyToThumbHandler).toBeCalledWith(mouseEvent, limitCoords);
    expect(spyGetLimitCoords).toBeCalled();
    spyFromThumbHandler.mockRestore();
    spyToThumbHandler.mockRestore();
    spyGetLimitCoords.mockRestore();
  });

  test('handlerScaleValueClick', () => {
    const spyScaleHandler = jest.spyOn(view.scale, 'handlerScaleValueClick');
    const mouseEvent = new MouseEvent('click', {});

    el.dispatchEvent(mouseEvent);

    expect(spyScaleHandler).toBeCalled();
    expect(spyScaleHandler).toBeCalledWith(mouseEvent);
    spyScaleHandler.mockRestore();
  });
});

describe('View: update', () => {
  test('should call template instance method "update"', () => {
    const keys = <OptionsKeys[]>['isDouble', 'isLabel'];
    const spyUpdate = jest.spyOn(Template.prototype, 'update');
    view.update(keys);

    expect(spyUpdate).toBeCalled();
    expect(spyUpdate).toBeCalledWith(keys);
    spyUpdate.mockRestore();
  });
});

describe('View: destroy', () => {
  test('should call RootView instance method "clear"', () => {
    const spyClear = jest.spyOn(view.root, 'clear');
    view.destroy();
    expect(spyClear).toBeCalled();
    spyClear.mockRestore();
  });
});
