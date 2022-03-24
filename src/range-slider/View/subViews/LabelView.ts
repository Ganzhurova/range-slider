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

  private getPercentPosition(): number {
    return this.percentPosition;
  }

  private setText(positionText: string): void {
    this.text = positionText;
  }

  private getText(): string {
    return this.text;
  }

  public setIsElExists(isElExists: boolean): void {
    this.isElExists = isElExists;
  }

  public getIsElExists(): boolean {
    return this.isElExists;
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

  public static switchCommonLabel(
    commonLabel: LabelView,
    fromLabel: LabelView,
    toLabel: LabelView
  ) {
    if (!toLabel.getIsElExists()) {
      fromLabel.show();
      return;
    }

    const getCommonText = () => {
      const fromText = fromLabel.getText();
      const toText = toLabel.getText();
      return fromText !== toText ? `${fromText} &ndash; ${toText}` : fromText;
    };

    const getCommonPosition = () => {
      const fromEnd =
        fromLabel.getPercentPosition() +
        fromLabel.getSize() * LabelView.percentPerPx;
      const toStart = toLabel.getPercentPosition();
      return (toStart - fromEnd) / 2 + fromEnd;
    };

    const isOverlay = LabelView.checkOverlay(fromLabel, toLabel);

    if (isOverlay) {
      commonLabel.setup(0);
      commonLabel.update(getCommonPosition(), getCommonText());
      fromLabel.hidden();
      toLabel.hidden();
      commonLabel.show();
    } else {
      fromLabel.show();
      toLabel.show();
      commonLabel.hidden();
    }
  }
}

export default LabelView;
