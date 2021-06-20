import LineView from './LineView';
import BarView from './BarView';

class SubViewsList {
  constructor(state) {
    this.line = new LineView(state);
    this.bar = new BarView();
  }

  get() {
    return this;
  }
}

export default SubViewsList;
