import Component from '../Component';
import { html } from '../../lib/html';
import { size } from '../../lib/constants';

class LineView extends Component {
  constructor() {
    super();
    this.init(html.line);
  }

  getCoords(isVertical) {
    const lineBox = this.el.getBox();
    const sizeName = isVertical ? size.HEIGHT : size.WIDTH;

    return {
      left: lineBox.left + window.pageXOffset,
      top: lineBox.top + window.pageYOffset,
      [sizeName]: lineBox[sizeName],
    };
  }
}

export default LineView;
