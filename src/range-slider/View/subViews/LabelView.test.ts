import { directions } from '../../lib/constants';
import DEFAULT_CONFIG from '../../lib/defaultConfig';
import { HTML } from '../../lib/html';
import { Settings } from '../../lib/interfaces';
import LabelView from './LabelView';
import LineView from './LineView';

let label: LabelView;
let labelEl: HTMLElement;

const thumbSize = 10;

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
const thumbPosition = 15;
const positionText = '78';

const line = new LineView(HTML.line, settings);

beforeEach(() => {
  label = new LabelView(HTML.label, settings);
  line.addChild(label);
});

describe('BarView: setup', () => {
  let spyPxToPercent: jest.SpyInstance<number, [px: number]>;

  beforeEach(() => {
    spyPxToPercent = jest.spyOn(label, 'pxToPercent');
  });

  test('should call pxToPercent method', () => {
    label.setup(thumbSize);
    expect(spyPxToPercent).toBeCalled();
    expect(spyPxToPercent).toBeCalledWith(thumbSize);
  });

  test('if the element does not exist, the method pxToPercent should not be called', () => {
    label.remove();
    label.setup(thumbSize);
    expect(spyPxToPercent).not.toBeCalled();
  });

  afterEach(() => {
    spyPxToPercent.mockRestore();
  });
});

describe('BarView: update', () => {
  describe('state - label element exists in html markup', () => {
    beforeEach(() => {
      label.update(thumbPosition, positionText);
      labelEl = label.getEl();
    });

    test('should give the element the appropriate text', () => {
      expect(labelEl.textContent).toBe(positionText);
    });

    test('should set style attribute for the element', () => {
      const isStyle = labelEl.hasAttribute('style');
      expect(isStyle).toBeTruthy();
    });
  });

  describe('state - element does not exist in html markup', () => {
    beforeEach(() => {
      label.remove();
      label.update(thumbPosition, positionText);
      labelEl = label.getEl();
    });

    test('label element must not have text', () => {
      expect(labelEl.textContent).toBe('');
    });

    test('label element must not have a style attribute', () => {
      const isStyle = labelEl.hasAttribute('style');
      expect(isStyle).toBeFalsy();
    });
  });
});

let fromLabel: LabelView;
let commonLabel: LabelView;
let toLabel: LabelView;
let commonLabelEl: HTMLElement;
let fromLabelEl: HTMLElement;
let toLabelEl: HTMLElement;

describe('LabelView: static method switchCommonLabel', () => {
  beforeEach(() => {
    fromLabel = label;
    commonLabel = new LabelView(HTML.label, settings);
    toLabel = new LabelView(HTML.label, settings);
    line.addChild(commonLabel);
    line.addChild(toLabel);
  });

  let commonText: string;
  const hidden = 'hidden';

  const callMetod = () => {
    LabelView.switchCommonLabel(commonLabel, fromLabel, toLabel);
  };

  const getElements = () => {
    commonLabelEl = commonLabel.getEl();
    fromLabelEl = fromLabel.getEl();
    toLabelEl = toLabel.getEl();
  };

  const updateText = (fromText: string, toText: string) => {
    commonText =
      fromText === toText ? `${fromText}` : `${fromText} – ${toText}`;
    fromLabel.update(0, fromText);
    toLabel.update(0, toText);
  };

  test('if the toLabel element does not exist, should show the fromLabel element', () => {
    toLabel.remove();
    callMetod();
    fromLabelEl = fromLabel.getEl();
    expect(fromLabelEl.style.visibility).toBeFalsy();
  });

  describe('elements fromLabel and toLabel overlap', () => {
    beforeEach(() => {
      LabelView.checkOverlay = jest.fn().mockReturnValue(true);
      callMetod();
      getElements();
    });

    test('should show the commonLabel element', () => {
      expect(commonLabelEl.style.visibility).toBeFalsy();
    });

    test('should hide fromLabel and toLabel elements', () => {
      expect(fromLabelEl.style.visibility).toBe(hidden);
      expect(toLabelEl.style.visibility).toBe(hidden);
    });
  });

  describe('commonLabel element must have valid text', () => {
    beforeEach(() => {
      LabelView.checkOverlay = jest.fn().mockReturnValue(true);
    });
    test('fromLabel and toLabel elements have different text', () => {
      updateText('10', '15');
      callMetod();
      commonLabelEl = commonLabel.getEl();
      expect(commonLabelEl.textContent).toBe(commonText);
    });
    test('fromLabel and toLabel elements have same text', () => {
      updateText('10', '10');
      callMetod();
      commonLabelEl = commonLabel.getEl();
      expect(commonLabelEl.textContent).toBe(commonText);
    });
  });

  describe('elements fromLabel and toLabel do not overlap', () => {
    beforeEach(() => {
      LabelView.checkOverlay = jest.fn().mockReturnValue(false);
      callMetod();
      getElements();
    });

    test('should hide the commonLabel element', () => {
      expect(commonLabelEl.style.visibility).toBe(hidden);
    });

    test('should show fromLabel and toLabel elements', () => {
      expect(fromLabelEl.style.visibility).toBeFalsy();
      expect(toLabelEl.style.visibility).toBeFalsy();
    });
  });
});
