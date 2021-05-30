const rootClass = 'range-slider';

const HTMLDefaults = {
  modifiers: {
    direction: 'vertical',
    from: 'from',
    to: 'to',
  },

  rootClass,
  // directionModifier: 'vertical',
  line: `${rootClass}__line`,
  bar: `${rootClass}__bar`,
  thumb: `${rootClass}__thumb`,
  label: `${rootClass}__label`,

  // line: {
  //   className: `${rootClass}__line`,
  //   tag: 'div',
  // },
};

export default HTMLDefaults;
