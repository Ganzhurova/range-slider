import { HTML } from '../../lib/html';
import { Settings } from '../../lib/interfaces';
import { Html } from '../../lib/types';
import Component from '../Component';

class ScaleView extends Component {
  private values: Component[] = [];

  private points: Component[] = [];

  private getScaleValues(): string[] {
    const values: string[] = [];
    const { min, max, scaleParts } = this.options;
    const step: number = (max - min) / scaleParts;

    let value: number = min;

    for (let i = 0; i <= scaleParts; i += 1) {
      values.push(value.toFixed(this.data.fractionLength));
      value = +value + step;
    }

    return values;
  }

  private createComponent(html: Html, text?: string): Component {
    const settings: Settings = {
      data: this.data,
      options: this.options,
    };
    const component = new Component(html, settings);
    if (text) {
      component.getEl().textContent = text;
    }

    return component;
  }

  private renderComponent(
    html: Html,
    percentPosition: number,
    array: Component[],
    text?: string
  ): void {
    const component = this.createComponent(html, text);

    component
      .getEl()
      .setAttribute(
        'style',
        `${
          this.data.direction.name
        }:${percentPosition}%; transform: translate${this.data.direction.coord.toUpperCase()}(-50%)`
      );

    this.addChild(component);
    array.push(component);
  }

  private setVisibilityOfValues(): void {
    let currIndex = 0;
    let nextIndex = 1;

    const hiddenElements = (index: number) => {
      this.values[index].hidden();
      this.points[index].hidden();
    };
    const showElements = (index: number) => {
      this.values[index].show();
      this.points[index].show();
    };

    for (let i = currIndex; i < this.values.length - 1; i += 1) {
      const isOverlay = ScaleView.checkOverlay(
        this.values[currIndex],
        this.values[nextIndex]
      );

      if (isOverlay) {
        if (nextIndex === this.values.length - 1) {
          const penultValue = this.values[currIndex];
          const lastValue = this.values[nextIndex];
          const offsetPX =
            penultValue.getCoord() +
            penultValue.getSize() -
            lastValue.getCoord();
          const isLessOneThird = () => offsetPX < penultValue.getSize() / 3;

          if (isLessOneThird()) {
            const offsetPercent = (offsetPX * 100) / lastValue.getSize();
            const transformPercent = -50 + offsetPercent;
            lastValue.getEl().style.transform = `translate${this.data.direction.coord.toUpperCase()}(${transformPercent}%)`;
          } else {
            hiddenElements(currIndex);
          }
        } else {
          hiddenElements(nextIndex);
          nextIndex += 1;
        }
      } else {
        showElements(nextIndex);
        currIndex = nextIndex;
        nextIndex += 1;
      }
    }
  }

  public renderDivisions(): void {
    if (!this.isElExists) return;
    this.el.innerHTML = '';
    this.values = [];
    this.points = [];

    const textValues = this.getScaleValues();
    const step = 100 / (textValues.length - 1);

    textValues.forEach((text, i) => {
      this.renderComponent(HTML.scalePoint, step * i, this.points);
      this.renderComponent(HTML.scaleValue, step * i, this.values, text);
    });
  }

  public setup(): void {
    if (!this.isElExists) return;

    this.el.setAttribute(
      'style',
      `${this.data.direction.size}:${this.data.percentageLimitSize}%`
    );

    this.setVisibilityOfValues();
  }
}

export default ScaleView;
