import Component from '../Component';
import { html } from '../../lib/html';
import helpers from '../../helpers/helpers';
import { size } from '../../lib/constants';

class ScaleView extends Component {
  constructor() {
    super();
    this.init(html.scale);
  }

  setup(sizeValue, values) {
    this.fixStyle(size, ScaleView.sizeName);
    this.el.innerHTML = '';
    this.el.style[ScaleView.sizeName] = `${sizeValue}px`;

    this.renderDivisions(values);
  }

  renderDivisions(values) {
    const step = ScaleView.getPercentageStep(values);

    values.forEach((value, i) => {
      const division = ScaleView.createDivision(value);
      division.style[ScaleView.direction] = `${step * i}%`;
      this.el.append(division);
    });
  }

  static getPercentageStep(values) {
    return 100 / (values.length - 1);
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
