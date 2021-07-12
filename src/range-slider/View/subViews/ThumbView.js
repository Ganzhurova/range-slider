import Component from '../Component';
import { html } from '../../lib/html';
import { directions } from '../../lib/constants';

class ThumbView extends Component {
  constructor() {
    super();
    this.init(html.thumb);
  }

  setPos(position, mainDirection) {
    Object.values(directions).forEach(direction => {
      if (direction === mainDirection) {
        this.el.style[direction] = `${position}px`;
      } else {
        this.el.style[direction] = '';
      }
    });
  }
}

export default ThumbView;
