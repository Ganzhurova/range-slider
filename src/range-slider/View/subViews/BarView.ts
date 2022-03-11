import Component from '../Component';
import { HTML } from '../../lib/html';

class BarView extends Component {
  private isDouble = false;

  private correctValue!: number;

  constructor() {
    super();
    this.init(HTML.bar);
  }

  public setup(thumbSize: number) {
    this.correctValue = (thumbSize / 2) * BarView.percentPerPx;
  }

  public setType(isDouble: boolean): void {
    this.isDouble = isDouble;
  }

  public update(fromPosition: number, toPosition: number): void {
    const START_POSITION = 0;

    const start = this.isDouble
      ? fromPosition + this.correctValue
      : START_POSITION;
    const end = this.isDouble
      ? toPosition - fromPosition
      : fromPosition + this.correctValue;

    this.el.setAttribute(
      'style',
      `${BarView.direction.name}:${start}%; ${BarView.direction.size}:${end}%`
    );
  }
}

export default BarView;
