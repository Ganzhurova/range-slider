import type { ObjValue } from '../../lib/types';
import Component from '../Component';
import { HTML } from '../../lib/html';

class ScaleView extends Component {
  private isElExists = false;

  private values: Component[] = [];

  private points: Component[] = [];

  constructor() {
    super();
    this.init(HTML.scale);
  }

  private renderComponent(
    html: ObjValue<typeof HTML>,
    percent: number,
    text: string,
    array: Component[]
  ): void {
    const component = new Component();
    component.init(html);

    const el = component.getEl();
    if (text) {
      el.textContent = text;
    }
    el.setAttribute(
      'style',
      `${
        ScaleView.direction.name
      }:${percent}%; transform: translate${ScaleView.direction.coord.toUpperCase()}(-50%)`
    );

    this.addChild(component);
    array.push(component);
  }

  private setVisibilityOfValues(): void {
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

  public setIsElExists(isElExists: boolean): void {
    this.isElExists = isElExists;
  }

  public renderDivisions(textValues: string[]): void {
    if (!this.isElExists) return;
    this.el.innerHTML = '';
    this.values = [];
    this.points = [];

    const step = 100 / (textValues.length - 1);

    textValues.forEach((text, i) => {
      this.renderComponent(HTML.scalePoint, step * i, '', this.points);
      this.renderComponent(HTML.scaleValue, step * i, text, this.values);
    });
  }

  public setup(lineSize: number): void {
    if (!this.isElExists) return;

    this.el.setAttribute('style', `${ScaleView.direction.size}:${lineSize}%`);
    this.setVisibilityOfValues();
  }
}

export default ScaleView;
