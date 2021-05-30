import HTMLDefaults from '../HTMLDefaults';
import DoubleHTMLElement from '../DoubleHTMLElement';

class LabelView extends DoubleHTMLElement {
  constructor(options) {
    super(options);
    this.isLabel = options.isLabel;
    this.createEl({ className: `${HTMLDefaults.rootClass}__label` });
  }

  getEl() {
    if (!this.isLabel) {
      return null;
    }

    return super.getEl();
  }
}

export default LabelView;
