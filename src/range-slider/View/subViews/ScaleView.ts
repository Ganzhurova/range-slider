import Component from '../Component';
import { HTML } from '../../lib/html';

class ScaleView extends Component {
  private isElExists = false;

  constructor() {
    super();
    this.init(HTML.scale);
  }

  public setIsElExists(isElExists: boolean): void {
    this.isElExists = isElExists;
  }

  public setup(lineSize: number): void {
    if (!this.isElExists) return;

    this.el.setAttribute('style', `${ScaleView.direction.size}:${lineSize}%`);
  }
}

export default ScaleView;
