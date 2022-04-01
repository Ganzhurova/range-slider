import type { ObjValue } from '../../lib/types';

import Component from '../Component';
import { HTML, mix } from '../../lib/html';

class RootView extends Component {
  constructor(el: HTMLElement) {
    super();
    this.el = el;
    this.init(HTML.rootEl);
  }

  public init(html: ObjValue<typeof HTML>): void {
    this.addClass(html.className);
  }

  public setDirection(isVertical: boolean): void {
    this.el.classList.toggle(mix.direction, isVertical);
  }
}

export default RootView;

