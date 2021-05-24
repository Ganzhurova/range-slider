import './range-slider.scss';
import './style.scss';

import Model from './Model/Model';
// import RangeSlider from './range-slider';
//
// const slider1 = new RangeSlider('#slider-1', {});
//
// const slider2 = new RangeSlider('#slider-2', {
//   type: 'double',
// });
//
// const slider3 = new RangeSlider('#slider-3', {
//   isVertical: true,
// });
//
// console.log(slider1);
// console.log(slider2);
// console.log(slider3);

const model = new Model({
  type: 'double',
});
console.log(model);
