import Component from './Component';
import { html } from '../../lib/html';

class ThumbView extends Component {
  constructor() {
    super();

    this.init(html.thumb);
  }
}

export default ThumbView;
