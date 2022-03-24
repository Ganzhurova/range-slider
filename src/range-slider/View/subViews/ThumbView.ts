import Component from '../Component';
import { Events } from '../../lib/constants';
import { HTML, mix } from '../../lib/html';
import helpers from '../../helpers/helpers';
import { ILimitCoords } from '../../lib/interfaces';

class ThumbView extends Component {
  private percentPosition!: number;

  private startPxCoord!: number;

  private step = 0;

  private limitCoords!: ILimitCoords;

  constructor() {
    super();
    this.init(HTML.thumb);
  }

  private setPercentPosition(percentPosition: number): void {
    this.percentPosition = percentPosition;
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

  public getPercentPosition(): number {
    return this.percentPosition;
  }

  public setup(percentPosition: number): void {
    this.setPercentPosition(percentPosition);
    this.el.setAttribute(
      'style',
      `${ThumbView.direction.name}:${this.percentPosition}%`
    );
    this.subscribe(Events.THUMB_SELECTED, (target: HTMLElement) => {
      if (target === this.el) {
        this.addClass(mix.selected);
      } else {
        this.removeClass(mix.selected);
      }
    });
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

    const eventCoord = helpers.getEventCoord(event);
    // const thumbCoord = this.getCoord();
    // const shift = eventCoord - thumbCoord;
    this.startPxCoord = eventCoord;

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

  private handlerThumbDrag(event: MouseEvent | TouchEvent) {
    // const startPxCoord = 0;
    // console.log(this.startPxCoord);
    console.log(this.getPercentPosition());

    const endPxCoord = helpers.getEventCoord(event);
    const delta = (this.startPxCoord - endPxCoord) * Component.percentPerPx;
    const percentPosition = this.getValidCoord(
      this.getPercentPosition() - delta
    );
    this.setPercentPosition(percentPosition);
    this.startPxCoord = endPxCoord;
    console.log(delta);

    // console.log(this.startPxCoord);

    console.log(this.getPercentPosition());

    this.emit(Events.NEW_PERCENT_POSITION, this.percentPosition);
    this.el.setAttribute(
      'style',
      `${ThumbView.direction.name}:${this.percentPosition}%`
    );
  }
}

export default ThumbView;
