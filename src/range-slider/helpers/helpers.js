import { positionIndex } from '../lib/constants';

const helpers = {
  getPositionName(index) {
    return positionIndex[index];
  },

  setIndex(index) {
    this.index = index;
  },
};
export default helpers;
