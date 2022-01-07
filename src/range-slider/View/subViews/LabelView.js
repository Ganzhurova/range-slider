import Component from '../Component';
import { html } from '../../lib/html';
import { directions } from '../../lib/constants';

class LabelView extends Component {
  constructor() {
    super();

    this.init(html.label);
  }

  setPercentValue(percentValue, size) {
    const labelSize = this.getSize() * Component.unit;
    const offset = (labelSize - size) / 2;
    this.percentValue = percentValue - offset;

    this.el.style[LabelView.direction] = `${this.percentValue}%`;
  }

  getPercentValue() {
    return this.percentValue;
  }

  setPositionText(positionText) {
    this.positionText = positionText;
    this.el.innerHTML = positionText;
  }

  getPositionText() {
    return this.positionText;
  }

  setup(percentValue, positionText, thumbSize) {
    this.fixStyle(directions, LabelView.direction);
    this.setPositionText(positionText);
    this.setPercentValue(percentValue, thumbSize);
  }

  static switchCommonLabel(common, from, to) {
    if (!to) {
      from.show();
      return;
    }

    const getCommonText = () => {
      const fromPos = from.getPositionText();
      const toPos = to.getPositionText();

      return fromPos !== toPos ? `${fromPos} &ndash; ${toPos}` : `${fromPos}`;
    };

    const getCommonPos = () => {
      const fromEnd = from.getPercentValue() + from.getSize() * Component.unit;
      const toStart = to.getPercentValue();

      return (toStart - fromEnd) / 2 + fromEnd;
    };

    const isOverlay = LabelView.checkOverlay(from, to);

    if (isOverlay) {
      common.setup(getCommonPos(), getCommonText(), 0);
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
