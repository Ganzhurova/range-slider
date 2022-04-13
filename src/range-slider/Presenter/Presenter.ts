import type { IOptions } from '../lib/interfaces';
import type { OptionsKeys } from '../lib/types';
import Model from '../Model/Model';
import View from '../View/View';

import { Events } from '../lib/constants';

class Presenter {
  private model: Model;

  private view: View;

  constructor(element: HTMLElement, options?: Partial<IOptions>) {
    this.model = new Model();
    this.view = new View(element, this.model.getState());

    this.init(options);
    this.update(options);
  }

  private init(options?: Partial<IOptions>): void {
    this.model.subscribe(Events.NEW_STATE, (keys: OptionsKeys[]) =>
      this.view.update(keys)
    );
    this.view.subscribe(Events.NEW_POSITION, () => {
      this.callOnChange(options);
    });
  }

  private callOnStart(options?: Partial<IOptions>): void {
    if (!options?.onStart) return;
    options.onStart(this.model.getState());
  }

  private callOnChange(options?: Partial<IOptions>): void {
    if (!options?.onChange) return;
    options.onChange(this.model.getState());
  }

  public update(options?: Partial<IOptions>): void {
    if (!options) return;

    const getStateOptions = ({
      onStart,
      onChange,
      ...state
    }: Partial<IOptions>) => state;

    this.model.updateState(getStateOptions(options));
    this.callOnStart(options);
  }
}

export default Presenter;

