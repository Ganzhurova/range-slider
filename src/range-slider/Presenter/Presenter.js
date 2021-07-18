// import EventEmitter from '../EventEmitter';

class Presenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.subscribe('positionChanged', (position, index) =>
      this.updatePosition(position, index)
    );
    model.subscribe('updateState', options => this.updateView(options));
    model.emit('updateState', model.getState());
  }

  updatePosition(position, index) {
    this.model.setPosition(position, index);
  }

  updateView(options) {
    this.view.update(options);
  }

  update(options) {
    this.model.update(options);
  }
}

export default Presenter;
