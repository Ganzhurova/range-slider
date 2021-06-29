import Component from './Component';
import { html } from '../../lib/html';

class RootView extends Component {
  constructor() {
    super();

    this.init(html.rootEl);
  }

  setDirection(className, boolean) {
    if (boolean) {
      this.addClass(className);
    } else {
      this.removeClass(className);
    }
  }
}

export default RootView;
