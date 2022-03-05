import type { IOptions } from '../lib/interfaces';
import DEFAULT_CONFIG from '../lib/defaultConfig';
import { Events } from '../lib/constants';

import EventEmitter from '../EventEmitter';

class Model extends EventEmitter {
  private state: IOptions = { ...DEFAULT_CONFIG };

  constructor(options: Partial<IOptions>) {
    super();
    console.log(this);
    this.updateState(options);
  }

  public updateState(options: Partial<IOptions>): void {
    Object.assign(this.state, options);
    this.validate();
    console.log(this.state);
    this.emit(Events.NEW_STATE, this.getState());
  }

  public getState(): IOptions {
    return this.state;
  }

  private validate(): void {
    this.validateLimits();
    this.validatePos();
    this.validateStep();
    this.validateScaleParts();
  }

  private validateLimits(): void {
    let { min, max } = this.state;

    if (min === max) {
      max += 1;
    }

    if (min > max) {
      [min, max] = [max, min];
    }

    this.state.min = min;
    this.state.max = max;
  }

  private validatePos(): void {
    let { from, to } = this.state;

    const isInRange = (value: number): boolean =>
      value >= this.state.min && value <= this.state.max;

    const isInvalidComparison = (): boolean => this.state.isDouble && from > to;

    const getDefaultFrom = (): number => this.state.min;
    const getDefaultTo = (): number => this.state.max;

    if (!isInRange(from)) {
      from = getDefaultFrom();
    }

    if (!isInRange(to)) {
      to = getDefaultTo();
    }

    if (isInvalidComparison()) {
      [from, to] = [to, from];
    }

    this.state.from = from;
    this.state.to = to;
  }

  private validateStep(): void {
    const { step } = this.state;
    this.state.step = Math.abs(step);
  }

  private validateScaleParts(): void {
    let parts: number = this.state.scaleParts;
    parts = Number.isInteger(parts) ? parts : Math.round(parts);
    this.state.scaleParts = Math.abs(parts);
  }
}

export default Model;
