import Component from '../Component';
import helpers from '../../helpers/helpers';
import { html } from '../../lib/html';

class LabelView extends Component {
  constructor() {
    super();
    this.index = 0;

    this.init(html.label);
  }

  setIndex(index) {
    helpers.setIndex.call(this, index);
  }

  correctDirection() {
    helpers.correctDirection.call(this, LabelView.direction);
  }

  setPxValue(pxValue, size) {
    const labelSize = this.getSize();
    const offset = (labelSize - size) / 2;
    this.pxValue = pxValue - offset;
  }

  getPxValue() {
    return this.pxValue;
  }

  setup(pxValue, position, thumbSize) {
    this.el.textContent = position;
    this.setPxValue(pxValue, thumbSize);

    this.el.style[LabelView.direction] = `${this.getPxValue()}px`;
  }

  hidden() {
    this.el.style.visibility = 'hidden';
  }

  show() {
    this.el.style.visibility = '';
  }

  static checkOverlap(from, to, index) {
    const toStart = to ? to.getPxValue() : undefined;

    if (!toStart) return;

    const fromEnd = from.getPxValue() + from.getSize();
    const isOverlap = () => fromEnd >= toStart;
    const labels = [from, to];
    const getActiveLabel = () => labels[index];
    const getInertLabel = () =>
      labels.find((label, i) => {
        if (i !== index) {
          return label;
        }
        return false;
      });
    // const getPxValue = () => (toStart - fromEnd) / 2 + fromEnd;
    // const getPositionText = () =>
    //   `${from.el.textContent} - ${to.el.textContent}`;
    // const getOldPositionText = () => labels[index].textContent;

    const active = getActiveLabel();
    const inert = getInertLabel();
    let currIndex;

    // if (isOverlap()) {
    //   inert.hidden();
    //   active.show();
    //
    //   const positionText = getPositionText();
    //   active.el.textContent = positionText;
    //   // inert.el.textContent = getOldPositionText();
    //
    //   const labelPosition = getPxValue() - active.getSize() / 2;
    //   active.el.style[LabelView.direction] = `${labelPosition}px`;
    //   inert.el.style[LabelView.direction] = `${inert.getPxValue()}px`;
    // } else {
    //   inert.show();
    // }

    if (isOverlap()) {
      if (currIndex === index) {
        active.show();
        console.log(currIndex);
      } else {
        currIndex = index;
        inert.hidden();
        console.log(currIndex);
      }
    }
  }
}

export default LabelView;
