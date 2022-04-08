import Component from '../Component';

class BarView extends Component {
  private correctValue!: number;

  public setup(thumbSize: number) {
    this.correctValue = this.pxToPercent(thumbSize / 2);
  }

  public update(fromPosition: number, toPosition: number): void {
    const START_POSITION = 0;

    const start = this.options.isDouble
      ? fromPosition + this.correctValue
      : START_POSITION;
    const end = this.options.isDouble
      ? toPosition - fromPosition
      : fromPosition + this.correctValue;

    this.el.setAttribute(
      'style',
      `${this.data.direction.name}:${start}%; ${this.data.direction.size}:${end}%`
    );
  }
}

export default BarView;

