import { positionIndex } from '../lib/constants';

const helpers = {
  getPositionName(index) {
    return positionIndex[index];
  },

  getEvent(event) {
    return event.type.search('touch') !== -1 ? event.touches[0] : event;
  },

  createEl(html) {
    const el = document.createElement(html.tag);
    el.className = html.className;
    return el;
  },
};
export default helpers;
