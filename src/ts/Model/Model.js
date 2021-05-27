import EventEmitter from '../EventEmitter';

class Model extends EventEmitter {
  #defaults = {
    type: 'single',
    vertical: false,
    label: true,
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
