import Component from '../Component';
// import { Events } from '../../lib/constants';
import { HTML } from '../../lib/html';

class ThumbView extends Component {
  private percentPosition!: number;

  constructor() {
    super();
    this.init(HTML.thumb);
  }

  private setPercentPosition(percentPosition: number): void {
    this.percentPosition = percentPosition;
    // this.emit(Events.NEW_PERCENT_POSITION, this.percentPosition);
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
  }

  
}

export default ThumbView;
