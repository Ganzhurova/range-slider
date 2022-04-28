import './style.scss';

import './range-slider/range-slider.scss';
import './range-slider/range-slider';
import Demo from './demo/Demo';

const firstOptions = {};
const secondOptions = { isVertical: true, isLabel: true, isScale: true };
const thirdOptions = {
  isDouble: true,
  isScale: true,
  isLabel: true,
  min: 50,
  from: 60,
  to: 90,
  scaleParts: 5,
  step: 10,
};
const options = [firstOptions, secondOptions, thirdOptions];

$('.js-slider-example').each(function initDemo(index) {
  $(this).rangeSlider(options[index]);
  const instance = $(this).data('rangeSlider');
  (() => new Demo(instance, index))();
});
