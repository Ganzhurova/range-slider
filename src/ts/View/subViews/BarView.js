import HTMLDefaults from '../HTMLDefaults';
import HTMLElement from '../HTMLElement';

class BarView extends HTMLElement {
  constructor(options) {
    super(options);
    this.createEl({ className: `${HTMLDefaults.rootClass}__bar` });
  }
}

export default BarView;
