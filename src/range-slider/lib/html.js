const root = 'range-slider';

const scale = {
  tag: 'div',
  className: `${root}__scale`,
};

const rootEl = {
  tag: 'div',
  className: root,
  directionModifier: 'vertical',
};

const line = {
  tag: 'div',
  className: `${root}__line`,
  parentName: rootEl.className,
};

const bar = {
  tag: 'div',
  className: `${root}__bar`,
  parentName: line.className,
};

const html = {
  rootEl,
  line,
  bar,
  scale,
};

console.log(html);

export default html;
