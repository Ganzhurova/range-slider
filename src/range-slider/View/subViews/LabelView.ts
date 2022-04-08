import Component from '../Component';

class LabelView extends Component {
  private thumbSizePercent!: number;

  private percentPosition!: number;

  private text!: string;

  private setPercentPosition(thumbPosition: number): void {
    const labelSizePercent = this.pxToPercent(this.getSize());
    const offset = (labelSizePercent - this.thumbSizePercent) / 2;

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

  public setup(thumbSize: number): void {
    if (!this.isElExists) return;

    this.thumbSizePercent = this.pxToPercent(thumbSize);
  }

  public update(thumbPosition: number, positionText: string) {
    if (!this.isElExists) return;

    this.setText(positionText);

    this.el.innerHTML = this.text;

    this.setPercentPosition(thumbPosition);
    this.el.setAttribute(
      'style',
      `${this.data.direction.name}:${this.percentPosition}%`
    );
  }

  public static switchCommonLabel(
    commonLabel: LabelView,
    fromLabel: LabelView,
    toLabel: LabelView
  ) {
    if (!toLabel.isElExists) {
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
        fromLabel.pxToPercent(fromLabel.getSize());
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

