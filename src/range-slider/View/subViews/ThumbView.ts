import Component from '../Component';
import { Events } from '../../lib/constants';
import { HTML, mix } from '../../lib/html';
import helpers from '../../helpers/helpers';
import { ILimitCoords } from '../../lib/interfaces';

class ThumbView extends Component {
  private percentPosition!: number;

  private startPxCoord!: number;

  private limitCoords!: ILimitCoords;

  private step = 0;

  private stepPxOffset = 0;

  constructor() {
    super();
    this.init(HTML.thumb);
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

  public setStep(step: number): void {
    this.step = step;
    this.stepPxOffset = step / 1.5 / Component.percentPerPx;
    console.log(this.step);
  }

  public setup(percentPosition: number): void {
    this.setPercentPosition(percentPosition);
    this.el.setAttribute(
      'style',
      `${ThumbView.direction.name}:${this.percentPosition}%`
    );
  }

  public handlerThumbDragStart(
    event: MouseEvent | TouchEvent,
    limitCoords: ILimitCoords
  ): void {
    event.preventDefault();

    const target = (<HTMLElement>event.target).closest(
      `.${HTML.thumb.className}`
    );
    if (target) {
      this.emit(Events.THUMB_SELECTED, target);
    }
    if (target !== this.el) return;

    this.setLimitCoords(limitCoords);

    this.startPxCoord = helpers.getEventCoord(event);

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
    const endPxCoord = helpers.getEventCoord(event);
    const delta = (this.startPxCoord - endPxCoord) * Component.percentPerPx;
    const isRightBorder = () =>
      Math.sign(delta) === -1 &&
      endPxCoord > this.getCoord() + this.stepPxOffset;
    const isLeftBorder = () =>
      Math.sign(delta) === 1 &&
      endPxCoord < this.getCoord() - this.stepPxOffset;

    let shift = 0;

    if (!this.step) {
      shift = delta;
    } else if (isRightBorder() || isLeftBorder()) {
      shift = this.step * Math.sign(delta);
    }

    this.startPxCoord = endPxCoord;

    const percentPosition = this.getValidCoord(
      this.getPercentPosition() - shift
    );
    this.setPercentPosition(percentPosition);

    this.emit(Events.NEW_PERCENT_POSITION, this.percentPosition);
    this.el.setAttribute(
      'style',
      `${ThumbView.direction.name}:${this.percentPosition}%`
    );
  }
}

export default ThumbView;

