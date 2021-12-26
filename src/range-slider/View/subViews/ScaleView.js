import Component from '../Component';
import { html } from '../../lib/html';
import helpers from '../../helpers/helpers';

class ScaleView extends Component {
  constructor() {
    super();
    this.init(html.scale);
  }

  setup(sizes, limits, settings) {
    const size = sizes.line - sizes.thumb;
    this.el.style[ScaleView.sizeName] = `${size}px`;

    const step = ScaleView.calcStep(limits);
    this.renderDivisions(limits, settings, step);
  }

  static calcStep(limits) {
    return (limits.max - limits.min) * 0.1;
  }

  renderDivisions(limits, settings) {
    console.log(limits);
    console.log(settings);
    console.log(this);

    // let value = limits.min - scaleSettings.step;
    //
    // // do {
    // //   const division = ScaleView.createDivision(value);
    // //   this.el.append(division);
    // //   value += scaleSettings.step;
    // //   value = +value.toFixed(scaleSettings.length);
    // // } while (value <= limits.max);
    //
    // // while (value < limits.max);
    // // {
    // //   const division = ScaleView.createDivision(value);
    // //   this.el.append(division);
    // //   value += scaleSettings.step;
    // //   value = +value.toFixed(scaleSettings.length);
    // // }
    //
    // while (value < limits.max) {
    //   // value += scaleSettings.step;
    //   // value = +value.toFixed(scaleSettings.length);
    //   const nextValue = value + scaleSettings.step;
    //
    //   value = nextValue > limits.max ? limits.max : nextValue;
    //   value = +value.toFixed(scaleSettings.length);
    //   console.log(value);
    // }
  }

  static createDivision(valueText) {
    const division = helpers.createEl(html.scaleDivision);
    const point = helpers.createEl(html.scalePoint);

    const value = helpers.createEl(html.scaleValue);
    value.textContent = valueText;

    division.append(point, value);
    console.log(division);
    return division;
  }
}

export default ScaleView;
