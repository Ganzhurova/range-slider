import Component from '../Component';
import { html } from '../../lib/html';
import { size, directions } from '../../lib/constants';

class BarView extends Component {
  constructor() {
    super();

    this.init(html.bar);
  }

  setup(correctValue, pxValues) {
    this.fixStyle(size, BarView.sizeName);
    this.fixStyle(directions, BarView.direction);

    const START_POSITION = 0;
    const isSingleType = Object.keys(pxValues).length === 1;
    const fromPos = pxValues[0] + correctValue;
    const toPos = pxValues[1] - pxValues[0];

    this.el.style[BarView.direction] = isSingleType
      ? `${START_POSITION}px`
      : `${fromPos}px`;

    this.el.style[BarView.sizeName] = isSingleType
      ? `${fromPos}px`
      : `${toPos}px`;
  }
}

export default BarView;
