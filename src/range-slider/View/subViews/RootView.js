import Component from '../Component';
import { html, mix } from '../../lib/html';

class RootView extends Component {
  constructor(el) {
    super();
    this.el = el;

    this.init();
  }

  init() {
    this.addClass(html.rootEl.className);
  }

  setDirection(isVertical) {
    this.el.classList.toggle(mix.direction, isVertical);
  }
}

export default RootView;
