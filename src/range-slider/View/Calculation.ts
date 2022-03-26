import type View from './View';
import Component from './Component';
import { IOptions } from '../lib/interfaces';

class Calculation {
  private view: View;

  private percentPerPx!: number;

  private percentPerPosition!: number;

  public fractionLength!: number;

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

  private calcPercentPerPosition({
    min,
    max,
  }: {
    min: number;
    max: number;
  }): void {
    const range = Math.abs(max - min);
    this.percentPerPosition = this.percentageLimitSize / range;
  }

  private calcFractionLength(options: IOptions): void {
    const arr: number[] = [];
    const { min, max, from, step } = options;
    arr.push(min, max, from, step);

    if (options.isDouble) {
      const { to } = options;
      arr.push(to);
    }

    const arrOfLengths = arr.map((num) =>
      num.toString().includes('.') ? num.toString().split('.').pop()?.length : 0
    );

    this.fractionLength = Math.max(...(<number[]>arrOfLengths));
  }

  public makeBaseCalc(options: IOptions): void {
    this.convertLinePxToPercent();
    this.calcLimitSizeOfLine();
    this.calcPercentPerPosition(options);
    this.calcFractionLength(options);
  }

  public positionToPercent(position: number): number {
    return position * this.percentPerPosition;
  }

  public percentToPosition(percent: number): number {
    return percent / this.percentPerPosition;
  }
}

export default Calculation;
