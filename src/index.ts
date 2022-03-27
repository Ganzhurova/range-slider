import './range-slider.scss';
import './style.scss';

import { IOptions } from './range-slider/lib/interfaces';

import Presenter from './range-slider/Presenter/Presenter';
import Model from './range-slider/Model/Model';
import View from './range-slider/View/View';

const options: Partial<IOptions> = {
  isLabel: true,
  isVertical: true,
  isScale: true,
  isDouble: true,
  // max: 18,
  scaleParts: 100,
  from: 22.52,
  max: 200,
  // step: 20,
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
d.update({ isVertical: false });
// d.update({ scaleParts: 5 });
// //
d.update({ isScale: false });
d.update({ isScale: true });
// d.update({ isVertical: true });
// d.update({ scaleParts: 100 });
// d.update({ from: 50 });
