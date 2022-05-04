import { directions } from '../../lib/constants';
import DEFAULT_CONFIG from '../../lib/defaultConfig';
import { HTML, mix } from '../../lib/html';
import { Settings } from '../../lib/interfaces';
import RootView from './RootView';

let root: RootView;
let rootEl: HTMLElement;

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
  root = new RootView(HTML.rootEl, settings);
  rootEl = root.getEl();
});

describe('RootView: setDirection', () => {
  test('state - isVertical: false. Root element must not have a corresponding class', () => {
    root.setDirection(false);
    expect(rootEl.classList.contains(mix.direction)).toBeFalsy();
  });

  test('state - isVertical: true. Root element must have a corresponding class', () => {
    root.setDirection(true);
    expect(rootEl.classList.contains(mix.direction)).toBeTruthy();
  });
});

describe('RootView: clear', () => {
  test('should remove the content of the element', () => {
    rootEl.innerHTML = `<div>Content</div>`;
    root.clear();
    expect(rootEl.innerHTML).toBeFalsy();
  });

  test('should remove base class', () => {
    root.clear();
    expect(rootEl.classList.contains(HTML.rootEl.className)).not.toBeTruthy();
  });

  test('should remove mix class', () => {
    root.setDirection(true);
    root.clear();
    expect(rootEl.classList.contains(mix.direction)).not.toBeTruthy();
  });
});
