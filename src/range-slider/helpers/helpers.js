import { positionIndex, directions } from '../lib/constants';

const helpers = {
  getPositionName(index) {
    return positionIndex[index];
  },

  correctDirection(mainDirection) {
    Object.values(directions).forEach(direction => {
      if (direction !== mainDirection) {
        this.el.style[direction] = '';
      }
    });
  },
};
export default helpers;
