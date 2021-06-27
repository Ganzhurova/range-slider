// import EventEmitter from '../EventEmitter';

class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    model.subscribe('initSlader', options => this.updateView(options));
    model.subscribe('updateState', options => this.updateView(options));

    model.emit('initSlader', model.getState());
  }

  // initView() {
  //   this.view.init();
  // }

  // getState() {
  //   const state = this.model.getState();
  //
  //   return {
  //     // решить за счет интерфейсов ?
  //     isDouble: state.isDouble,
  //     isVertical: state.isVertical,
  //     isLabel: state.isLabel,
  //     isScale: state.isScale,
  //     min: state.min,
  //     max: state.max,
  //     from: state.from,
  //     to: state.to,
  //     scaleRange: state.scaleRange,
  //   };
  // }

  updateView(options) {
    this.view.update(options);
  }

  update(options) {
    this.model.update(options);
    // this.view.update(this.getState());
  }
}

export default Presenter;
