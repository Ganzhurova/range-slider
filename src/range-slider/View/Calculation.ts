import type View from './View';
import Component from './Component';

class Calculation {
  private view: View;

  private percentPerPx!: number;

  private percentPerPosition!: number;

  public percentageLimitSize!: number;

  constructor(view: View) {
    this.view = view;
  }

  private convertLinePxToPercent(): void {
    this.percentPerPx = 100 / <number>this.view.line.getSize();
    Component.percentPerPx = this.percentPerPx;
  }

  private calcLimitSizeOfLine(): void {
    this.percentageLimitSize =
      (this.view.line.getSize() - this.view.fromThumb.getSize()) *
      this.percentPerPx;
  }

  private calcPercentPerPosition(min: number, max: number): void {
    const range = Math.abs(max - min);
    this.percentPerPosition = this.percentageLimitSize / range;
  }

  public makeBaseCalc(min: number, max: number): void {
    this.convertLinePxToPercent();
    this.calcLimitSizeOfLine();
    this.calcPercentPerPosition(min, max);
  }

  public positionToPercent(position: number): number {
    return position * this.percentPerPosition;
  }

  public percentToPosition(percent: number): number {
    return percent / this.percentPerPosition;
  }
}

export default Calculation;
