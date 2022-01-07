import Component from '../Component';
import { html } from '../../lib/html';
// import helpers from '../../helpers/helpers';
import { size } from '../../lib/constants';

class ScaleView extends Component {
  constructor() {
    super();
    this.init(html.scale);
  }

  setup(sizeValue, textValues) {
    this.fixStyle(size, ScaleView.sizeName);
    this.el.innerHTML = '';
    this.updateSize(sizeValue);

    this.renderDivisions(textValues);
    this.setVisibilityOfValues();
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
      this.allValuesVisible = true;
    });
    // console.log(this.values);
  }

  updateSize(sizeValue) {
    this.el.style[ScaleView.sizeName] = `${sizeValue}%`;
  }

  getOverlapValues() {
    const sumSizes = this.values
      .filter(value => !value.el.style.visibility)
      .map(value => value.getSize())
      .reduce((total, amount) => total + amount);

    const scaleSize = this.getSize();

    if (scaleSize > sumSizes) {
      return false;
    }

    return true;
  }

  getIndexLargerValue() {
    const startIndex = 1;
    const endIndex = this.values.length - 2;

    return this.values[startIndex].getSize() > this.values[endIndex].getSize()
      ? startIndex
      : endIndex;
  }

  setVisibilityOfValues() {
    const isOverlap = this.getOverlapValues();
    if (!isOverlap) return;
    // console.log(isOverlap);

    for (let i = 0; i < this.values.length; i += 1) {
      // console.log(i);
      if (i === this.values.length - 1) break;

      if (i % 2 !== 0) {
        this.values[i].hidden();
      }
    }

    // const k = this.getOverlapValues();
    // console.log(k);

    // if (this.values.length % 2 !== 0) {
    //   for (let i = 1; i < this.values.length; i += 2) {
    //     this.values[i].hidden();
    //   }
    // } else {
    //   const f = this.getIndexLargerValue();
    //   console.log(f);
    //   this.values[this.getIndexLargerValue()].hidden();
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
