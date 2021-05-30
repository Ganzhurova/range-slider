import HTMLDefaults from '../HTMLDefaults';
import HTMLElement from '../HTMLElement';

class ScaleView extends HTMLElement {
  constructor(options) {
    super();
    this.isScale = options.isScale;
    this.createEl({ className: `${HTMLDefaults.rootClass}__scale` });
  }

  getEl() {
    if (!this.isScale) {
      return null;
    }

    return super.getEl();
  }
}

export default ScaleView;
