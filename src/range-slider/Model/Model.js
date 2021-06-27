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
    this.emit('updateState', this.state);
    console.log(this.state);
  }

  getState() {
    return this.state;
  }

  update(options) {
    this.setState(options);
  }
}

export default Model;
