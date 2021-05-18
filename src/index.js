import './range-slider.scss';
import './style.scss';
import RangeSlider from './range-slider';

const slider1 = new RangeSlider('#slider-1', {});

const slider2 = new RangeSlider('#slider-2', {
  type: 'double',
});

console.log(slider1);
console.log(slider2);
