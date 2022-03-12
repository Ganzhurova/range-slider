const root = 'range-slider';

const HTML = {
  rootEl: {
    tag: 'div',
    className: root,
  },
  line: {
    tag: 'div',
    className: `${root}__line`,
  },
  bar: {
    tag: 'div',
    className: `${root}__bar`,
  },
  thumb: {
    tag: 'div',
    className: `${root}__thumb`,
  },
  label: {
    tag: 'div',
    className: `${root}__label`,
  },
  scale: {
    tag: 'div',
    className: `${root}__scale`,
  },
  scalePoint: {
    tag: 'span',
    className: `${root}__point`,
  },
  scaleValue: {
    tag: 'span',
    className: `${root}__value`,
  },
};

const mix = {
  direction: 'vertical',
  selected: 'selected',
};

export { HTML, mix };
