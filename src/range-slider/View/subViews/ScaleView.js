import Component from '../Component';
import { html } from '../../lib/html';
// import helpers from '../../helpers/helpers';
import { size } from '../../lib/constants';

class ScaleView extends Component {
  constructor() {
    super();
    this.init(html.scale);
  }

  setup(sizeValue, valuesText) {
    this.fixStyle(size, ScaleView.sizeName);
    this.el.innerHTML = '';
    this.updateSize(sizeValue);

    this.renderDivisions(valuesText);
    // this.setVisibilityOfValues();
  }

  renderDivisions(textValues) {
    this.values = [];

    const step = ScaleView.getPercentageStep(textValues);

    textValues.forEach((textValue, i) => {
      const point = ScaleView.getComponent(html.scalePoint, step * i);
      const value = ScaleView.getComponent(html.scaleValue, step * i);

      value.el.textContent = textValue;

      this.addChild(point);
      this.addChild(value);

      this.values.push(value);
    });
    console.log(this.values);
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

    // for (let i = 1; i <= this.divisions.length; i += 2) {
    //   const division = this.divisions[i];
    //   division.hidden(division.valueEl);
    // }
  }

  // getValue(e) {
  //   return this.values.indexOf(e.target);
  // }

  static getComponent(htmlValue, percent) {
    const component = new Component();
    component.init(htmlValue);

    component.el.style[ScaleView.direction] = `${percent}%`;
    component.el.style.transform = `translate${ScaleView.coordName}(-50%)`;

    return component;
  }

  static getPercentageStep(textValues) {
    return 100 / (textValues.length - 1);
  }
}

export default ScaleView;
