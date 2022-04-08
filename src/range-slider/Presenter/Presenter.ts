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

    this.model.subscribe(Events.NEW_STATE, (keys: OptionsKeys[]) =>
      this.view.update(keys)
    );
    this.update(options);
  }

  update(options?: Partial<IOptions>) {
    this.model.updateState(options);
  }
}

export default Presenter;

