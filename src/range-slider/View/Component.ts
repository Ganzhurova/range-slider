import type { ObjValue } from '../lib/types';
import { HTML } from '../lib/html';
import { directions } from '../lib/constants';

import EventEmitter from '../EventEmitter';

class Component extends EventEmitter {
  protected static direction: ObjValue<typeof directions> = directions.LEFT;

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

  public getEl(): HTMLElement {
    return this.el;
  }

  public static setDirection(isVertical: boolean): void {
    Component.direction = isVertical ? directions.TOP : directions.LEFT;
  }
}

export default Component;
