import Component from '../Component';
import { html } from '../../lib/html';
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
    this.points = [];

    const step = ScaleView.getPercentageStep(textValues);

    textValues.forEach((textValue, i) => {
      const point = ScaleView.getComponent(html.scalePoint, step * i);
      const value = ScaleView.getComponent(html.scaleValue, step * i);

      value.el.textContent = textValue;

      this.addChild(point);
      this.addChild(value);

      this.values.push(value);
      this.points.push(point);
    });
  }

  updateSize(sizeValue) {
    this.el.style[ScaleView.sizeName] = `${sizeValue}%`;
  }

  setVisibilityOfValues() {
    let currIndex = 0;
    let nextIndex = 1;

    for (let i = currIndex; i < this.values.length; i += 1) {
      if (currIndex === this.values.length - 1) break;

      const isOverlay = ScaleView.checkOverlay(
        this.values[currIndex],
        this.values[nextIndex]
      );

      if (isOverlay) {
        if (nextIndex === this.values.length - 1) {
          this.values[currIndex].hidden();
          this.points[currIndex].hidden();
        } else {
          this.values[nextIndex].hidden();
          this.points[nextIndex].hidden();
          nextIndex += 1;
        }
      } else {
        this.values[nextIndex].show();
        this.points[nextIndex].show();
        currIndex = nextIndex;
        nextIndex += 1;
      }
    }
  }

  getIndex(evtTarget) {
    return this.values.findIndex(value => value.el === evtTarget);
  }

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
