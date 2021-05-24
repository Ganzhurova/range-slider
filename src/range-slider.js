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
    this.coords = {};

    // this.#render();
    this.#calcPercent();
    this.#action();
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  #render() {
    const template = createTemplate(this.options);
    this.el.classList.add('range-slider');
    this.el.append(template);
  }

  get lineCoords() {
    const lineBox = this.el
      .querySelector('.range-slider__line')
      .getBoundingClientRect();

    return {
      start: 0,
      end: lineBox.width,
      width: lineBox.width,
      height: lineBox.height,
      left: lineBox.left,
      top: lineBox.top,
    };
  }

  get thumbProps() {
    const thumbBox = this.el
      .querySelector('.range-slider__thumb')
      .getBoundingClientRect();

    return {
      width: thumbBox.width,
      height: thumbBox.height,
      left: thumbBox.left,
      top: thumbBox.top,
    };
  }

  #calcPercent() {
    if (!this.options.isVertical) {
      this.thumbWidthPercent =
        (this.thumbProps.width * 100) / this.lineCoords.width;
      this.scaleWidth = 100 - this.thumbWidthPercent;
      this.ratioWidth = this.scaleWidth / 100;
    } else {
      this.thumbHeightPercent =
        (this.thumbProps.height * 100) / this.lineCoords.height;
      this.scaleHeight = 100 - this.thumbHeightPercent;
      this.ratioHeight = this.scaleHeight / 100;
    }
  }

  #convertToPercent(coords) {
    this.coords.thumbLeft = (coords.left * 100) / this.lineCoords.width;
    this.coords.thumbTop = (coords.top * 100) / this.lineCoords.height;
  }

  onMouseMove(e) {
    e.preventDefault();

    const newCoords = {
      left: e.clientX - this.shift.x - this.lineCoords.left,
      top: e.clientY - this.shift.y - this.lineCoords.top,
    };

    if (!this.options.isVertical) {
      if (newCoords.left < this.lineCoords.start) {
        newCoords.left = this.lineCoords.start;
      } else if (
        newCoords.left >
        this.lineCoords.width - this.thumbProps.width
      ) {
        newCoords.left = this.lineCoords.width - this.thumbProps.width;
      }

      this.#convertToPercent(newCoords);

      this.activeThumbEl.style.left = `${this.coords.thumbLeft}%`;
      this.label.style.left = `${newCoords.left}px`;
      this.bar.style.width = `${newCoords.left}px`;
    }

    if (this.options.isVertical) {
      if (newCoords.top < this.lineCoords.start) {
        newCoords.top = this.lineCoords.start;
      } else if (
        newCoords.top >
        this.lineCoords.height - this.thumbProps.height
      ) {
        newCoords.top = this.lineCoords.height - this.thumbProps.height;
      }

      this.activeThumbEl.style.top = `${newCoords.top}px`;
    }
  }

  onMouseUp(e) {
    e.preventDefault();
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseDown(e) {
    e.preventDefault();

    this.activeThumbEl = e.currentTarget;

    this.shift = {
      x: e.clientX - this.activeThumbEl.getBoundingClientRect().left,
      y: e.clientY - this.activeThumbEl.getBoundingClientRect().top,
    };

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  #action() {
    this.thumb = this.el.querySelector('.range-slider__thumb');
    this.thumbFrom = this.el.querySelector('.range-slider__thumb.from');
    this.thumbTo = this.el.querySelector('.range-slider__thumb.to');

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    if (this.options.type === 'single') {
      this.thumb.addEventListener('mousedown', this.onMouseDown);
      this.label = this.el.querySelector('.range-slider__label');
      this.bar = this.el.querySelector('.range-slider__bar');
    } else {
      this.thumbFrom.addEventListener('mousedown', this.onMouseDown);
      this.thumbTo.addEventListener('mousedown', this.onMouseDown);
    }
  }
}

export default RangeSlider;
