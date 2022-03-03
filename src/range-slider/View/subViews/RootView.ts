import type { Key } from '../../lib/types';

import Component from '../Component';
import { HTML, mix } from '../../lib/html';

class RootView extends Component {
  constructor(el: HTMLElement) {
    super();
    this.el = el;
    this.init(HTML.rootEl);
  }

  init(html: Key<typeof HTML>): void {
    this.addClass(html.className);
  }

  setDirection(isVertical: boolean): void {
    this.el.classList.toggle(mix.direction, isVertical);
  }
}

export default RootView;
