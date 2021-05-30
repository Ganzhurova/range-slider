import EventEmitter from '../EventEmitter';
import types from '../defaults';

class Model extends EventEmitter {
  #defaults = {
    type: types.SINGLE,
    vertical: false,
    label: false,
  };

  constructor(options = {}) {
    super();
    Object.assign(this, this.#defaults, options);
  }

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setVertical(isVertical) {
    this.vertical = isVertical;
  }

  getVertical() {
    return this.vertical;
  }

  setLabel(isLabel) {
    this.label = isLabel;
  }

  getLabel() {
    return this.label;
  }
}

export default Model;
