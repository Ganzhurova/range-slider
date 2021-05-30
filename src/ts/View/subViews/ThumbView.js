import HTMLDefaults from '../HTMLDefaults';
import DoubleHTMLElement from '../DoubleHTMLElement';

class ThumbView extends DoubleHTMLElement {
  constructor(options) {
    super(options);
    this.createEl({ className: `${HTMLDefaults.rootClass}__thumb` });
  }
}

export default ThumbView;
