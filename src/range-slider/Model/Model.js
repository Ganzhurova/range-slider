import EventEmitter from '../EventEmitter';
import stateModel from './stateModel';
import defaults from '../lib/defaults';
import helpers from '../helpers/helpers';

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
    this.emit('updateState', this.getState());
    console.log(this.state);
  }

  getState() {
    return this.state;
  }

  updatePosition(position, index) {
    const positionName = helpers.getPositionName(index);
    this.state[positionName] = stateModel.toFixed(
      position,
      this.state.fractionLength
    );
    console.log(`${positionName}: ${this.state[positionName]}`);
  }

  update(options) {
    this.setState(options);
  }
}

export default Model;
