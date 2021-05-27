import './range-slider.scss';
import './style.scss';

import Model from './ts/Model/Model';
import View from './ts/View/View';
import Presenter from './ts/Presenter/Presenter';
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
  vertical: true,
};

console.log(new Presenter(new View('#slider-1'), new Model(options)));
