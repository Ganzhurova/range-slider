import type { Html } from '../lib/types';
import { IDataView, IOptions, Settings } from '../lib/interfaces';

import EventEmitter from '../EventEmitter';

class Component extends EventEmitter {
  protected data: IDataView;

  protected options: IOptions;

  protected el!: HTMLElement;

  protected isElExists = false;

  constructor(settings: Settings, html: Html, el?: HTMLElement) {
    super();
    this.data = settings.data;
    this.options = settings.options;
    this.init(html, el);
  }

  public init(html: Html, el?: HTMLElement): void {
    this.el = el || document.createElement(html.tag);
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
    return <number>box[this.data.direction.size];
  }

  public getCoord() {
    const box = this.getBox();
    const coordName = this.data.direction.coord;
    const pageOffset =
      coordName === 'x' ? window.pageXOffset : window.pageYOffset;

    return <number>box[this.data.direction.name] + pageOffset;
  }

  public positionToPercent(position: number): number {
    return position * this.data.percentPerPosition;
  }

  public percentToPosition(percent: number): number {
    return percent / this.data.percentPerPosition;
  }

  public percentToPx(percent: number): number {
    return percent / this.data.percentPerPx;
  }

  public pxToPercet(px: number): number {
    return px * this.data.percentPerPx;
  }

  public static checkOverlay(componentA: Component, componentB: Component) {
    const componentAEndPx = componentA.getCoord() + componentA.getSize();
    const componentBStartPx = componentB.getCoord();

    return componentAEndPx >= componentBStartPx;
  }
}

export default Component;

