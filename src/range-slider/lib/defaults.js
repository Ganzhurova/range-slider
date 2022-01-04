import { types } from './constants';

const defaults = {
  type: types.SINGLE,
  isVertical: false,
  isLabel: false,
  isScale: false,
  min: 0,
  max: 100,
  scaleParts: 4,
  // scaleRange: [], // вынести в интерфейс
  // isDouble: false, // вынести в интерфейс для вида
};

export default defaults;
