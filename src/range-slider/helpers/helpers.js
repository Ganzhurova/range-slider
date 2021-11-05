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

  getEvent(event) {
    return event.type.search('touch') !== -1 ? event.touches[0] : event;
  },
};
export default helpers;
