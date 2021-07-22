import Component from '../Component';
import helpers from '../../helpers/helpers';
import { html } from '../../lib/html';

class LabelView extends Component {
  constructor() {
    super();
    this.index = 0;

    this.init(html.label);
  }

  setIndex(index) {
    helpers.setIndex.call(this, index);
  }

  setup() {
    console.log(this);
  }
}

export default LabelView;
