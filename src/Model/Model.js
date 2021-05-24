class Model {
  #defaults = {
    type: 'single',
    isVertical: false,
  };

  constructor(options = {}) {
    Object.assign(this, this.#defaults, options);
  }
}

export default Model;
