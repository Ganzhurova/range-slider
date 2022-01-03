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

  hidden() {
    this.el.style.visibility = 'hidden';
  }

  show() {
    this.el.style.visibility = '';
  }

  static checkOverlap(common, from, to) {
    const toStart = to ? to.getPercentValue() : undefined;

    if (!toStart) {
      from.show();
      return;
    }

    const fromEnd = from.getPercentValue() + from.getSize() * Component.unit;
    const isOverlap = fromEnd >= toStart;

    const percentValueCommon = (toStart - fromEnd) / 2 + fromEnd;
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

    common.setup(percentValueCommon, getCommonText(), 0);

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
