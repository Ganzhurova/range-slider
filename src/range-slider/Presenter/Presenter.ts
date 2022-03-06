import type { IOptions } from '../lib/interfaces';
import type Model from '../Model/Model';
import type View from '../View/View';

import { Events } from '../lib/constants';

class Presenter {
  private model: Model;

  private view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.model.subscribe(Events.NEW_STATE, (options) =>
      this.view.update(options)
    );
    this.model.emit(Events.NEW_STATE, this.model.getState());
  }

  update(options: Partial<IOptions>) {
    this.model.updateState(options);
  }
}

export default Presenter;
