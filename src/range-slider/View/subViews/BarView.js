import Component from '../Component';
import html from '../../lib/html';

class BarView extends Component {
  constructor() {
    super();
    this.el = BarView.createEl(html.bar);
  }
}

export default BarView;
