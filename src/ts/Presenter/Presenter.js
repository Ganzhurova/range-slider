class Presenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.#initView();
  }

  getIsVertical() {
    return this.model.getVertical();
  }

  #initView() {
    this.view.registerWith(this);
    this.view.init();
  }
}

export default Presenter;
