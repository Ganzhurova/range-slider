import Component from './Component';
import { html } from '../../lib/html';

class BarView extends Component {
  constructor() {
    super();

    this.init(html.bar);
  }
}

export default BarView;
