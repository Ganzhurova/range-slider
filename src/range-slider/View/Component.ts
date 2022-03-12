import type { ObjValue } from '../lib/types';
import { IDirection } from '../lib/interfaces';
import { HTML } from '../lib/html';
import { directions } from '../lib/constants';

import EventEmitter from '../EventEmitter';

class Component extends EventEmitter {
  protected static direction: IDirection = directions.LEFT;

  public static percentPerPx: number;

  protected el!: HTMLElement;

  protected init(html: ObjValue<typeof HTML>): void {
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

  public static setDirection(isVertical: boolean): void {
    Component.direction = isVertical ? directions.TOP : directions.LEFT;
  }
}

export default Component;
