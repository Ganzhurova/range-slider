import Component from '../Component';
import html from '../../lib/html';

class LineView extends Component {
  constructor(options) {
    super();
    this.el = LineView.createEl(html.line);
    console.log(options);
    console.log(this.el.className);
  }

  // render() {}
}

export default LineView;
