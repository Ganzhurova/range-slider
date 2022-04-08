import Component from '../Component';
import { Events } from '../../lib/constants';
import { HTML, mix } from '../../lib/html';
import { Html, PositionKeys } from '../../lib/types';
import helpers from '../../helpers/helpers';
import { ILimitCoords, Settings } from '../../lib/interfaces';

class ThumbView extends Component {
  private percentPosition!: number;

  private startPxCoord!: number;

  private limitCoords!: ILimitCoords;

  private step = {
    percent: 0,
    pxOffset: 0,
  };

  constructor(settings: Settings, html: Html) {
    super(settings, html);
    this.subscribe(Events.THUMB_SELECTED, (target: HTMLElement) => {
      if (target === this.el) {
        this.addClass(mix.selected);
      } else {
        this.removeClass(mix.selected);
      }
    });
  }

  private setLimitCoords(limitCoords: ILimitCoords): void {
    this.limitCoords = limitCoords;
  }

  private setPercentStep(): void {
    this.step.percent = this.positionToPercent(this.options.step);

    const stepPx = this.percentToPx(this.step.percent);
    const ratio = 1.5;
    this.step.pxOffset = stepPx / ratio;
  }

  private getValidCoord(coord: number): number {
    if (coord < this.limitCoords.start) {
      return this.limitCoords.start;
    }
    if (coord > this.limitCoords.end) {
      return this.limitCoords.end;
    }
    return coord;
  }

  public setPercentPosition(percentPosition: number): void {
    this.percentPosition = percentPosition;
  }

  public getPercentPosition(): number {
    return this.percentPosition;
  }

  public getPosition(): number {
    const getValidPosition = (value: number) => value + this.options.min;
    return +getValidPosition(
      this.percentToPosition(this.getPercentPosition())
    ).toFixed(this.data.fractionLength);
  }

  public setup(key: PositionKeys) {
    const position = this.options[key];
    const getValidPosition = (value: number) => value - this.options.min;

    this.setPercentPosition(this.positionToPercent(getValidPosition(position)));
    this.setPercentStep();

    this.el.setAttribute(
      'style',
      `${this.data.direction.name}:${this.percentPosition}%`
    );
  }

  public handlerThumbDragStart(
    event: MouseEvent | TouchEvent,
    limitCoords: ILimitCoords
  ): void {
    const target = (<HTMLElement>event.target).closest(
      `.${HTML.thumb.className}`
    );
    if (target) {
      this.emit(Events.THUMB_SELECTED, target);
    }
    if (target !== this.el) return;

    event.preventDefault();

    this.setLimitCoords(limitCoords);

    this.startPxCoord = helpers.getEventCoord(
      event,
      this.data.direction.coord.toUpperCase()
    );

    const handlerThumbDrag = this.handlerThumbDrag.bind(this);

    const handlerThumbDragEnd = () => {
      document.removeEventListener('mousemove', handlerThumbDrag);
      document.removeEventListener('mouseup', handlerThumbDragEnd);
      document.removeEventListener('touchmove', handlerThumbDrag);
      document.removeEventListener('touchend', handlerThumbDragEnd);
    };

    document.addEventListener('mousemove', handlerThumbDrag);
    document.addEventListener('mouseup', handlerThumbDragEnd);
    document.addEventListener('touchmove', handlerThumbDrag);
    document.addEventListener('touchend', handlerThumbDragEnd);
  }

  private handlerThumbDrag(event: MouseEvent | TouchEvent): void {
    const endPxCoord = helpers.getEventCoord(
      event,
      this.data.direction.coord.toUpperCase()
    );
    const delta = this.pxToPercent(this.startPxCoord - endPxCoord);
    const isRightBorder = () =>
      Math.sign(delta) === -1 &&
      endPxCoord > this.getCoord() + this.step.pxOffset;
    const isLeftBorder = () =>
      Math.sign(delta) === 1 &&
      endPxCoord < this.getCoord() - this.step.pxOffset;

    let shift = 0;

    if (!this.step.percent) {
      shift = delta;
    } else if (isRightBorder() || isLeftBorder()) {
      shift = this.step.percent * Math.sign(delta);
    }

    this.startPxCoord = endPxCoord;

    const percentPosition = this.getValidCoord(
      this.getPercentPosition() - shift
    );
    this.setPercentPosition(percentPosition);

    this.emit(Events.NEW_PERCENT_POSITION, this.percentPosition);
    this.el.setAttribute(
      'style',
      `${this.data.direction.name}:${this.percentPosition}%`
    );
  }
}

export default ThumbView;

