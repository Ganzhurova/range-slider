import Component from '../Component';
import { HTML, mix } from '../../lib/html';

class RootView extends Component {
  public setDirection(isVertical: boolean): void {
    this.el.classList.toggle(mix.direction, isVertical);
  }

  public clear(): void {
    this.el.innerHTML = '';
    this.removeClass(HTML.rootEl.className);
    if (this.el.classList.contains(mix.direction)) {
      this.removeClass(mix.direction);
    }
  }
}

export default RootView;

