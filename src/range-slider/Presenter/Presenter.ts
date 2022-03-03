import type { IOptions } from '../lib/interfaces';
import type Model from '../Model/Model';
import type View from '../View/View';

class Presenter {
  private model: Model;

  private view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    console.log(this.view);
  }

  update(options: Partial<IOptions>) {
    this.model.updateState(options);
  }
}

export default Presenter;
