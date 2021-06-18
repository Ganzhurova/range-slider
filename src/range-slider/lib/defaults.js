import types from './constants';

const defaults = {
  type: types.SINGLE,
  vertical: false,
  label: false,
  scale: false,
  min: 0,
  max: 100,
  from: 50,
  to: null,
  step: 25,
  scaleRange: [], // вынести в интерфейс
  isDouble: false, // вынести в интерфейс для вида
};

export default defaults;
