class Presenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.#initView();
  }

  #initView() {
    const viewModel = {
      type: this.model.getType(),
      isVertical: this.model.getVertical(),
      isLabel: this.model.getLabel(),
      isScale: this.model.getScale(),
    };

    this.view.init(viewModel);
  }
}

export default Presenter;
