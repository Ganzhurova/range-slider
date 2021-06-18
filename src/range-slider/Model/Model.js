import EventEmitter from '../EventEmitter';
import stateModel from './stateModel';
import defaults from '../lib/defaults';

class Model extends EventEmitter {
  constructor(options) {
    super();
    this.state = { ...defaults };

    this.setState(options);
  }

  setState(options) {
    const oldState = this.getState();
    const newState = { ...oldState, ...options };

    stateModel.set(newState);

    this.state = stateModel.get();
    console.log(this.state);
  }

  getState() {
    return this.state;
  }
}

export default Model;
