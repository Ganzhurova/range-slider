import Component from '../Component';
import ScaleDivisionView from './ScaleDivisionView';
import { html } from '../../lib/html';
// import helpers from '../../helpers/helpers';
import { size } from '../../lib/constants';

class ScaleView extends Component {
  constructor() {
    super();
    this.init(html.scale);
    this.divisions = [];
  }

  setup(sizeValue, values) {
    this.fixStyle(size, ScaleView.sizeName);
    this.el.innerHTML = '';
    this.updateSize(sizeValue);

    this.renderDivisions(values);
    this.setVisibilityOfValues();
  }

  renderDivisions(values) {
    const step = ScaleView.getPercentageStep(values);

    values.forEach((value, i) => {
      const division = new ScaleDivisionView();
      division.setup(value);
      division.el.style[ScaleView.direction] = `${step * i}%`;
      this.addChild(division);
      this.divisions.push(division);
    });
  }

  updateSize(sizeValue) {
    this.el.style[ScaleView.sizeName] = `${sizeValue}%`;
  }

  getOverlapDivisions() {
    const sumDivisionsSize = this.divisions
      .map(division => division.getSize())
      .reduce((total, amount) => total + amount);

    const scaleSize = this.getSize();

    if (scaleSize > sumDivisionsSize) {
      return false;
    }

    return true;
  }

  setVisibilityOfValues() {
    const isOverlap = this.getOverlapDivisions();
    if (!isOverlap) return;
    console.log(isOverlap);
  }

  // getValue(e) {
  //   return this.values.indexOf(e.target);
  // }

  static getPercentageStep(values) {
    return 100 / (values.length - 1);
  }

  // static createDivision(valueText) {
  //   const division = helpers.createEl(html.scaleDivision);
  //   const point = helpers.createEl(html.scalePoint);
  //   const value = helpers.createEl(html.scaleValue);
  //
  //   value.textContent = valueText;
  //
  //   division.append(point, value);
  //   return division;
  // }
}

export default ScaleView;
