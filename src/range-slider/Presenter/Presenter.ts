import type { IOptions } from '../lib/interfaces';
import type { PositionKeys } from '../lib/types';
import type Model from '../Model/Model';
import type View from '../View/View';

import { Events } from '../lib/constants';

class Presenter {
  private model: Model;

  private view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.view.subscribe(
      Events.NEW_POSITION,
      (position: number, key: PositionKeys) => {
        this.model.updatePosition(position, key);
      }
    );
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
