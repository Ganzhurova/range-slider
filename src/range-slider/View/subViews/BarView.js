import Component from '../Component';
import html from '../../lib/html';

class BarView extends Component {
  constructor(options) {
    super(options);
    this.createEl(html.bar, options.modifier);
    this.setChildren(options.children);
  }

  assignEl(obj) {
    obj.bar = this.el;
  }
}

export default BarView;
