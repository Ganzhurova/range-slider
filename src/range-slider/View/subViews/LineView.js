import Component from '../Component';
import { html } from '../../lib/html';

class LineView extends Component {
  constructor() {
    super();
    this.init(html.line);
  }
}

export default LineView;
