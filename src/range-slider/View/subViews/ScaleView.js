import Component from '../Component';
import { html } from '../../lib/html';
import helpers from '../../helpers/helpers';

class ScaleView extends Component {
  constructor() {
    super();
    this.init(html.scale);
  }

  setup(size, values) {
    this.el.style[ScaleView.sizeName] = `${size}px`;

    this.renderDivisions(values);
  }

  renderDivisions(values) {
    values.forEach(value => {
      const division = ScaleView.createDivision(value);
      this.el.append(division);
    });
  }

  static createDivision(valueText) {
    const division = helpers.createEl(html.scaleDivision);
    const point = helpers.createEl(html.scalePoint);
    const value = helpers.createEl(html.scaleValue);

    value.textContent = valueText;

    division.append(point, value);
    return division;
  }
}

export default ScaleView;
