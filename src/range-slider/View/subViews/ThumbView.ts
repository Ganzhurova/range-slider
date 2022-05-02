import Component from '../Component';
import { Events } from '../../lib/constants';
import { HTML, mix } from '../../lib/html';
import { Html, PositionKeys } from '../../lib/types';
import helpers from '../../helpers/helpers';
import { ILimitCoords, Settings } from '../../lib/interfaces';

class ThumbView extends Component {
  private percentPosition = 0;

  private limitCoords!: ILimitCoords;

  constructor(html: Html, settings: Settings) {
    super(html, settings);
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

  private calcPercentPositionWithStep(percent: number): number {
    const stepPercent = this.positionToPercent(this.options.step);
    if (stepPercent) {
      return Math.round(percent / stepPercent) * stepPercent;
    }
    return percent;
  }

  private getValidPercentCoord(coord: number): number {
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
    if (!this.isElExists) return;

    const position = this.options[key];
    const getValidPosition = (value: number) => value - this.options.min;

    this.setPercentPosition(this.positionToPercent(getValidPosition(position)));
  }

  public update(): void {
    if (!this.isElExists) return;

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

    const eventDragStartPxCoord = helpers.getEventCoord(
      event,
      this.data.direction.coord.toUpperCase()
    );

    const shiftPx = eventDragStartPxCoord - this.getCoord();

    const handlerThumbDrag = this.handlerThumbDrag.bind(this, shiftPx);

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

  private handlerThumbDrag(
    shiftPx: number,
    event: MouseEvent | TouchEvent
  ): void {
    const eventDragPxCoord = helpers.getEventCoord(
      event,
      this.data.direction.coord.toUpperCase()
    );
    const currCoordPx = eventDragPxCoord - shiftPx;
    const deltaPercent = this.pxToPercent(this.getCoord() - currCoordPx);
    const percent = this.getPercentPosition() - deltaPercent;
    const percentPosition = this.getValidPercentCoord(
      this.calcPercentPositionWithStep(percent)
    );

    this.setPercentPosition(percentPosition);
    this.emit(Events.NEW_PERCENT_POSITION);
    this.update();
  }
}

export default ThumbView;

