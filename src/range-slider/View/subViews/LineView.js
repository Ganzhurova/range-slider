import HTMLDefaults from '../HTMLDefaults';
import HTMLElement from '../HTMLElement';

class LineView extends HTMLElement {
  constructor() {
    super();
    this.createEl({ className: `${HTMLDefaults.rootClass}__line` });
  }
}

export default LineView;
