const types = {
  SINGLE: 'single',
  DOUBLE: 'double',
};

const defaults = {
  type: types.SINGLE,
  vertical: false,
  label: false,
  scale: false,
  min: 0,
  max: 100,
  from: null,
  to: null,
  step: 1,
};

export { types, defaults };
