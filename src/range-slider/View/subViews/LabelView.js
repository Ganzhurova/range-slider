import Component from '../Component';
import helpers from '../../helpers/helpers';
import { html } from '../../lib/html';

class LabelView extends Component {
  constructor() {
    super();

    this.init(html.label);
  }

  correctDirection() {
    helpers.correctDirection.call(this, LabelView.direction);
  }

  setPxValue(pxValue, size) {
    const labelSize = this.getSize();
    const offset = (labelSize - size) / 2;
    this.pxValue = pxValue - offset;

    this.el.style[LabelView.direction] = `${this.pxValue}px`;
  }

  getPxValue() {
    return this.pxValue;
  }

  setPositionText(positionText) {
    this.positionText = positionText;
    this.el.innerHTML = positionText;
  }

  getPositionText() {
    return this.positionText;
  }

  setup(pxValue, positionText, thumbSize) {
    this.setPositionText(positionText);
    this.setPxValue(pxValue, thumbSize);
  }

  hidden() {
    this.el.style.visibility = 'hidden';
  }

  show() {
    this.el.style.visibility = '';
  }

  static checkOverlap(common, from, to) {
    const toStart = to ? to.getPxValue() : undefined;

    if (!toStart) return;

    const fromEnd = from.getPxValue() + from.getSize();
    const isOverlap = fromEnd >= toStart;

    const pxValueCommon = (toStart - fromEnd) / 2 + fromEnd;
    const getCommonText = () => {
      const fromPos = from.getPositionText();
      const toPos = to.getPositionText();
      let posText;

      if (fromPos !== toPos) {
        posText = `${fromPos} &ndash; ${toPos}`;
      } else {
        posText = `${fromPos}`;
      }
      return posText;
    };

    common.setup(pxValueCommon, getCommonText(), 0);

    if (isOverlap) {
      from.hidden();
      to.hidden();
      common.show();
    } else {
      from.show();
      to.show();
      common.hidden();
    }
  }
}

export default LabelView;
