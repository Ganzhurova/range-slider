import './range-slider.scss';
import './style.scss';

import Model from './range-slider/Model/Model';
import View from './range-slider/View/View';
import Presenter from './range-slider/Presenter/Presenter';

const options1 = {
  type: 'double',
  label: true,
  scale: true,
};

const options3 = {
  vertical: true,
  label: true,
  scale: true,
};

console.log(new Presenter(new View('#slider-1'), new Model(options1)));
console.log(new Presenter(new View('#slider-3'), new Model(options3)));
