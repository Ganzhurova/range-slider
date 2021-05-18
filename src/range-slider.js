const makeElement = (className, text = '') => {
  const element = document.createElement('div');
  element.className = className;
  if (text) {
    element.textContent = text;
  }
  return element;
};

const createTemplate = options => {
  const { type } = options;
  const line = makeElement('range-slider__line');
  const bar = makeElement('range-slider__bar');
  const thumb = makeElement('range-slider__thumb');
  const label = makeElement('range-slider__label', 50);

  line.append(bar);

  if (type === 'single') {
    line.append(thumb, label);
  } else if (type === 'double') {
    const thumbFrom = makeElement('range-slider__thumb from');
    const labelFrom = makeElement('range-slider__label from', 25);
    const thumbTo = makeElement('range-slider__thumb to');
    const labelTo = makeElement('range-slider__label to', 75);
    line.append(thumbFrom, labelFrom, thumbTo, labelTo);
  }

  return line;
};

class RangeSlider {
  constructor(selector, options) {
    const defaultOptions = {
      type: 'single',
      isVertical: false,
    };

    this.el = document.querySelector(selector);
    this.options = { ...defaultOptions, ...options };

    this.#render();
  }

  #render() {
    const template = createTemplate(this.options);
    this.el.classList.add('range-slider');
    this.el.append(template);
  }
}

export default RangeSlider;
