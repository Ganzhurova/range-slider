import { directions } from '../../lib/constants';
import DEFAULT_CONFIG from '../../lib/defaultConfig';
import { HTML } from '../../lib/html';
import { Settings } from '../../lib/interfaces';
import BarView from './BarView';

type PositioningProperty = 'left' | 'top';
type SizeProperty = 'width' | 'height';

let bar: BarView;
let barEl: HTMLElement;
let correctValue: number;

const thumbSize = 20;
const fromPosition = 40;
const toPosition = 60;
const options = { ...DEFAULT_CONFIG };

const settings: Settings = {
  data: {
    direction: directions.LEFT,
    percentPerPx: 2,
    percentPerPosition: 5,
    percentageLimitSize: 0,
    fractionLength: 0,
  },
  options,
};

beforeEach(() => {
  bar = new BarView(HTML.bar, settings);
});

test('BarView: setup should call pxToPercent method', () => {
  const spyPxToPercent = jest.spyOn(bar, 'pxToPercent');
  bar.setup(thumbSize);
  expect(spyPxToPercent).toBeCalled();
  expect(spyPxToPercent).toBeCalledWith(thumbSize / 2);
  spyPxToPercent.mockRestore();
});

describe('BarView: update', () => {
  beforeEach(() => {
    bar.setup(thumbSize);
    bar.update(fromPosition, toPosition);
    barEl = bar.getEl();

    correctValue = bar.pxToPercent(thumbSize / 2);
  });
  test('should set style attribute for the bar element', () => {
    const isStyle = barEl.hasAttribute('style');
    expect(isStyle).toBeTruthy();
  });

  describe('should set the correct position of the element', () => {
    test('state - isDouble: false', () => {
      const startPosition = '0%';
      const positionProp = <PositioningProperty>settings.data.direction.name;
      expect(barEl.style[positionProp]).toBe(startPosition);

      const endPosition = `${fromPosition + correctValue}%`;
      const sizeProp = <SizeProperty>settings.data.direction.size;
      expect(barEl.style[sizeProp]).toBe(endPosition);
    });

    test('state - isDouble: true', () => {
      options.isDouble = true;
      bar.setup(thumbSize);
      bar.update(fromPosition, toPosition);
      barEl = bar.getEl();

      const startPosition = `${fromPosition + correctValue}%`;
      const positionProp = <PositioningProperty>settings.data.direction.name;
      expect(barEl.style[positionProp]).toBe(startPosition);

      const endPosition = `${toPosition - fromPosition}%`;
      const sizeProp = <SizeProperty>settings.data.direction.size;
      expect(barEl.style[sizeProp]).toBe(endPosition);
    });
  });
});
