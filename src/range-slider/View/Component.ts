import type { ObjValue } from '../lib/types';
import { IDirection } from '../lib/interfaces';
import { HTML } from '../lib/html';
import { directions } from '../lib/constants';

import EventEmitter from '../EventEmitter';

class Component extends EventEmitter {
  public static direction: IDirection = directions.LEFT;

  public static percentPerPx: number;

  protected el!: HTMLElement;

  public init(html: ObjValue<typeof HTML>): void {
    this.el = document.createElement(html.tag);
    this.addClass(html.className);
  }

  public addClass(className: string): void {
    this.el.classList.add(className);
  }

  public removeClass(className: string): void {
    this.el.classList.remove(className);
  }

  public addChild(child: Component): void {
    this.el.append(child.getEl());
  }

  public remove(): void {
    this.el.remove();
  }

  public hidden(): void {
    this.el.style.visibility = 'hidden';
  }

  public show(): void {
    this.el.style.visibility = '';
  }

  public getEl(): HTMLElement {
    return this.el;
  }

  private getBox(): DOMRect {
    return this.el.getBoundingClientRect();
  }

  public getSize(): number {
    const box = this.getBox();
    return <number>box[Component.direction.size];
  }

  public getCoord() {
    const box = this.getBox();
    const coordName = Component.direction.coord;
    const pageOffset =
      coordName === 'x' ? window.pageXOffset : window.pageYOffset;

    return <number>box[Component.direction.name] + pageOffset;
  }

  public static setDirection(isVertical: boolean): void {
    Component.direction = isVertical ? directions.TOP : directions.LEFT;
  }

  public static checkOverlay(componentA: Component, componentB: Component) {
    if (!componentB) return false;

    const componentAEndPx = componentA.getCoord() + componentA.getSize();
    const componentBStartPx = componentB.getCoord();

    return componentAEndPx >= componentBStartPx;
  }
}

export default Component;
