const root = 'range-slider';

const mix = {
  direction: 'vertical',
  selected: 'selected',
};

const html = {
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
  scaleDivision: {
    tag: 'div',
    className: `${root}__division`,
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

const scaleDivisionHtmlTemplate = `
<div class="range-slder__division">
  <span class="range-slider__point"></span>
  <span class="range-slider__value">0</span>
</div>
`;

export { html, mix, scaleDivisionHtmlTemplate };
