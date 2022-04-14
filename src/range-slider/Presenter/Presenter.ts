import type { IOptions } from '../lib/interfaces';
import type { OptionsKeys } from '../lib/types';
import Model from '../Model/Model';
import View from '../View/View';

import { Events } from '../lib/constants';

type CallbackNames = 'onStart' | 'onChange';

class Presenter {
  private model: Model;

  private view: View;

  private options: Partial<IOptions> = {};

  constructor(element: HTMLElement, options?: Partial<IOptions>) {
    this.model = new Model();
    this.view = new View(element, this.model.getState());

    this.init();
    this.update(options);
  }

  private init(): void {
    this.model.subscribe(Events.NEW_STATE, (keys: OptionsKeys[]) =>
      this.view.update(keys)
    );
    this.view.subscribe(Events.NEW_POSITION, () => {
      this.callCallback('onChange');
    });
  }

  private callCallback(callbackName: CallbackNames) {
    if (!this.options[callbackName]) return;
    this.options[callbackName]?.(this.model.getState());
  }

  public update(options?: Partial<IOptions>): void {
    if (!options) return;

    Object.assign(this.options, options);

    const getStateOptions = ({
      onStart,
      onChange,
      ...state
    }: Partial<IOptions>) => state;

    this.model.updateState(getStateOptions(options));
    this.callCallback('onStart');
  }
}

export default Presenter;

