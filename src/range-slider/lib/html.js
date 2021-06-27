const root = 'range-slider';
const directionMix = 'vertical';

const html = {
  // modifiers: {
  //   direction: 'vertical',
  //   from: 'from',
  //   to: 'to',
  // },

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
  scale: {
    tag: 'div',
    className: `${root}__scale`,
  },
};

export { html, directionMix };
