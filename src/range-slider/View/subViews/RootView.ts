import Component from '../Component';
import { mix } from '../../lib/html';

class RootView extends Component {
  public setDirection(isVertical: boolean): void {
    this.el.classList.toggle(mix.direction, isVertical);
  }
}

export default RootView;

