import Component from '../Component';
import { HTML } from '../../lib/html';

class LabelView extends Component {
  private isElExists = false;

  private correctValue!: number;

  private percentPosition!: number;

  private text!: string;

  constructor() {
    super();
    this.init(HTML.label);
  }

  private setPercentPosition(thumbPosition: number): void {
    const labelSize = this.getSize() * LabelView.percentPerPx;
    const offset = (labelSize - this.correctValue) / 2;

    this.percentPosition = thumbPosition - offset;
  }

  private setText(positionText: string): void {
    this.text = positionText;
  }

  public setIsElExists(isElExists: boolean): void {
    this.isElExists = isElExists;
  }

  public setup(thumbSize: number): void {
    if (!this.isElExists) return;

    this.correctValue = thumbSize * LabelView.percentPerPx;
  }

  public update(thumbPosition: number, positionText: string): void {
    if (!this.isElExists) return;

    this.setPercentPosition(thumbPosition);
    this.setText(positionText);

    this.el.innerHTML = this.text;
    this.el.setAttribute(
      'style',
      `${LabelView.direction.name}:${this.percentPosition}%`
    );
  }
}

export default LabelView;
