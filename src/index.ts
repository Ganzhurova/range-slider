import './range-slider.scss';
import './style.scss';

import Model from './range-slider/Model/Model';
import View from './range-slider/View/View';
import Presenter from './range-slider/Presenter/Presenter';

const options = {
  type: 'double',
  // isVertical: true,
  isLabel: true,
  isScale: true,
  // step: -1000000.00000006,
  // min: -100.8,
  // max: 100,
  min: -100,
  max: 100,
  step: 20,
  scaleParts: 20,
  // from: 0,
  // to: -1000000,
  // scaleStep: 100,
};

const s = new Presenter(new Model(options), new View('#slider-1'));

window.s = s;
// console.log(s);

// s.update({ isVertical: true });
// s.update({ isVertical: false });
// s.update({ type: 'single', isVertical: true });
// s.update({ type: 'single' });
// s.update({ type: 'double' });
// s.update({ isLabel: false });
// s.update({ isLabel: true });
// s.update({ isScale: false });
// s.update({ isScale: true });
