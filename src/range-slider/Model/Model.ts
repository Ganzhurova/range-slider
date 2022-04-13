import type { IStateModel } from '../lib/interfaces';
import type { OptionsKeys } from '../lib/types';
import DEFAULT_CONFIG from '../lib/defaultConfig';
import { Events } from '../lib/constants';

import EventEmitter from '../EventEmitter';

class Model extends EventEmitter {
  private state: IStateModel = { ...DEFAULT_CONFIG };

  public updateState(options: Partial<IStateModel>): void {
    const oldState = { ...this.getState() };

    Object.assign(this.state, options);
    this.validate();

    const changedKeys = this.getChangedKeys(oldState);
    if (changedKeys.length > 0) {
      this.emit(Events.NEW_STATE, changedKeys);
    }
  }

  public getState(): IStateModel {
    return this.state;
  }

  private getChangedKeys(options: IStateModel): OptionsKeys[] {
    const changedKeys: OptionsKeys[] = [];

    Object.keys(options).forEach((key) => {
      if (options[<OptionsKeys>key] !== this.state[<OptionsKeys>key]) {
        changedKeys.push(<OptionsKeys>key);
      }
    });

    return changedKeys;
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

