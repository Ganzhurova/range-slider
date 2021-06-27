import Component from '../Component';
import html from '../../lib/html';

class LineView extends Component {
  constructor(options) {
    super(options);
    this.createEl(html.line, options.modifier);
    this.setChildren(options.children);
  }

  assignEl(obj) {
    obj.line = this.el;
  }
}

export default LineView;
