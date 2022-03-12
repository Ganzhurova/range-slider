import './range-slider.scss';
import './style.scss';

import { IOptions } from './range-slider/lib/interfaces';

import Presenter from './range-slider/Presenter/Presenter';
import Model from './range-slider/Model/Model';
import View from './range-slider/View/View';

const options: Partial<IOptions> = {
  isLabel: true,
  // isVertical: true,
  isScale: true,
  isDouble: true,
  // max: 18,
};

const d = new Presenter(new Model(options), new View('#slider-1'));
console.log(d);

// d.update({ isLabel: true, isVertical: false, isDouble: false });
// d.update({ isDouble: true });
// // d.update({ isLabel: true });
// d.update({ isDouble: false });
// d.update({ isDouble: true });
// // d.update({ isLabel: false });
// d.update({ isVertical: false, isScale: false });
// d.update({ isVertical: false });
// d.update({ isScale: true });
