import Component from '../Component';
import helpers from '../../helpers/helpers';
import { html } from '../../lib/html';
import { size } from '../../lib/constants';

class BarView extends Component {
  constructor() {
    super();

    this.init(html.bar);
  }

  correctDirection() {
    helpers.correctDirection.call(this, BarView.direction);
  }

  correctSize() {
    Object.values(size).forEach(sizeName => {
      if (sizeName !== BarView.sizeName) {
        this.el.style[sizeName] = '';
      }
    });
  }

  setup(correctValue, pxValues) {
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
