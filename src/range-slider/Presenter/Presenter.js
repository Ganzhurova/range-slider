class Presenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.initView();
  }

  initView() {
    const state = this.model.getState();

    const viewState = {
      // решить за счет интерфейсов ?
      isDouble: state.isDouble,
      isVertical: state.isVertical,
      isLabel: state.isLabel,
      isScale: state.isScale,
      min: state.min,
      max: state.max,
      from: state.from,
      to: state.to,
      scaleRange: state.scaleRange,
    };

    this.view.init(viewState);
  }
}

export default Presenter;
