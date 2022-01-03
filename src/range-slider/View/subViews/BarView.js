import Component from '../Component';
import { html } from '../../lib/html';
import { size, directions } from '../../lib/constants';

class BarView extends Component {
  constructor() {
    super();

    this.init(html.bar);
  }

  setup(correctValue, percentValues) {
    this.fixStyle(size, BarView.sizeName);
    this.fixStyle(directions, BarView.direction);

    const START_POSITION = 0;
    const isSingleType = Object.keys(percentValues).length === 1;
    const fromPos = percentValues[0] + correctValue;
    const toPos = percentValues[1] - percentValues[0];

    this.el.style[BarView.direction] = isSingleType
      ? `${START_POSITION}%`
      : `${fromPos}%`;

    this.el.style[BarView.sizeName] = isSingleType
      ? `${fromPos}%`
      : `${toPos}%`;
  }
}

export default BarView;
