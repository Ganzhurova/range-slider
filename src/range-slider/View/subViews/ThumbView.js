import Component from './Component';
import { html } from '../../lib/html';

class ThumbView extends Component {
  static unit = 0;

  constructor() {
    super();

    this.init(html.thumb);
  }

  static setUnit(unit) {
    ThumbView.unit = unit;
  }

  setPos(direction, value) {
    const percent = value * ThumbView.unit;
    if (!this.el) {
      this.setEl();
    }
    this.el.style[direction] = `${percent}%`;
  }

  // setDirection(isVertical) {
  //   this.direction = isVertical ? 'top' : 'left';
  // }

  // setPercentPerUnit(size) {
  //   this.unit = size;
  // }

  // setPos(value) {
  //   this.attrs.style = `${this.direction}: ${value * this.unit}%;`;
  // }

  // getLeft() {
  //   this.attrs.style = `left: ${ThumbView.calcPos()};`;
  // }
}

export default ThumbView;
