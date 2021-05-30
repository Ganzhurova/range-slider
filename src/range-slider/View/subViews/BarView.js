import HTMLDefaults from '../HTMLDefaults';
import HTMLElement from '../HTMLElement';

class BarView extends HTMLElement {
  constructor() {
    super();
    this.createEl({ className: `${HTMLDefaults.rootClass}__bar` });
  }
}

export default BarView;
