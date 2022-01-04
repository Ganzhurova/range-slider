import Component from '../Component';
import { html } from '../../lib/html';

class ScaleDivisionView extends Component {
  constructor() {
    super();
    this.init(html.scaleDivision);
  }

  setup(valueText) {
    const point = ScaleDivisionView.createChildEl(html.scalePoint);
    this.valueEl = ScaleDivisionView.createChildEl(html.scaleValue);
    this.valueEl.textContent = valueText;
    this.el.append(point, this.valueEl);
  }
}

export default ScaleDivisionView;
