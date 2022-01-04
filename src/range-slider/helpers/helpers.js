import { positionIndex } from '../lib/constants';

const helpers = {
  getPositionName(index) {
    return positionIndex[index];
  },

  getEvent(event) {
    return event.type.search('touch') !== -1 ? event.touches[0] : event;
  },

  getEventCoord(event, instance) {
    const evt = helpers.getEvent(event);
    const pageCoordName = `page${instance.coordName}`;
    return evt[pageCoordName];
  },
};
export default helpers;
