import HTMLDefaults from '../HTMLDefaults';
import HTMLElement from '../HTMLElement';

class LineView extends HTMLElement {
  constructor(options) {
    super(options);
    this.createEl({ className: `${HTMLDefaults.rootClass}__line` });
  }
}

export default LineView;
