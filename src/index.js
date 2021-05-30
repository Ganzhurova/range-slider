import './range-slider.scss';
import './style.scss';

import Model from './range-slider/Model/Model';
import View from './range-slider/View/View';
import Presenter from './range-slider/Presenter/Presenter';
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

const options = {
  type: 'double',
  // vertical: true,
  label: true,
  // scale: true,
};

console.log(new Presenter(new View('#slider-1'), new Model(options)));
