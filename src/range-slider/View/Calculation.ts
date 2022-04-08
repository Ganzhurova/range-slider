import type View from './View';
import { IDataView, ILimitCoords, IOptions } from '../lib/interfaces';
import { PositionKeys } from '../lib/types';

class Calculation {
  private view: View;

  private data: IDataView;

  private options: IOptions;

  constructor(view: View) {
    this.view = view;
    this.data = view.data;
    this.options = view.options;
  }

  private convertLinePxToPercent(): void {
    this.data.percentPerPx = 100 / <number>this.view.line.getSize();
  }

  private calcLimitSizeOfLine(): void {
    this.data.percentageLimitSize =
      (this.view.line.getSize() - this.view.fromThumb.getSize()) *
      this.data.percentPerPx;
  }

  private calcPercentPerPosition(): void {
    const { min, max } = this.options;
    const range = Math.abs(max - min);
    this.data.percentPerPosition = this.data.percentageLimitSize / range;
  }

  private calcFractionLength(): void {
    const arr: number[] = [];
    const { min, max, from, step } = this.options;
    arr.push(min, max, from, step);

    if (this.options.isDouble) {
      const { to } = this.options;
      arr.push(to);
    }

    const arrOfLengths = arr.map((num) =>
      num.toString().includes('.') ? num.toString().split('.').pop()?.length : 0
    );

    this.data.fractionLength = Math.max(...(<number[]>arrOfLengths));
  }

  public makeBaseCalc(): void {
    this.convertLinePxToPercent();
    this.calcLimitSizeOfLine();
    this.calcPercentPerPosition();
    this.calcFractionLength();
  }

  public getLimitCoords(key: PositionKeys): ILimitCoords {
    const startCoord = 0;
    const fromCoord = this.view.fromThumb.getPercentPosition();
    const toCoord = this.view.toThumb.getPercentPosition();
    const endCoord = this.data.percentageLimitSize;
    const getFromEndCoord = () => (this.options.isDouble ? toCoord : endCoord);

    return {
      start: key === 'from' ? startCoord : fromCoord,
      end: key === 'from' ? getFromEndCoord() : endCoord,
    };
  }
}

export default Calculation;

