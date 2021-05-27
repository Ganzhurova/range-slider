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
      label: this.model.getLabel(),
    };

    this.view.init(viewModel);
  }
}

export default Presenter;
