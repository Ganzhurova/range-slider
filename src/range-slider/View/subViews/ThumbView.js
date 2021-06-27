import Component from '../Component';
import html from '../../lib/html';

class ThumbView extends Component {
  constructor(options) {
    super(options);
    this.createEl(html.thumb, options.modifier);
    this.setChildren(options.children);
  }

  assignEl(obj) {
    obj.from = this.el;
    obj.to = this.el;
  }
}

export default ThumbView;
