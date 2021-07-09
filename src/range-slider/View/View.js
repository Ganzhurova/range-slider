import Template from './Template';
import vDom from './vDom';
import { html } from '../lib/html';

class View {
  constructor(selector) {
    this.el = document.querySelector(selector);
    this.template = new Template();

    this.init();
    this.template.subscribe('updateView', () =>
      this.template.calcPercentPerUnit()
    );
  }

  init() {
    if (this.el.nodeName.toLowerCase() !== html.rootEl.tag) {
      throw new Error('Base element should be <div>!');
    }
  }

  update(options) {
    const template = this.template.build(options);
    this.el = vDom.update(template, this.el);
    this.template.emit('updateView');
  }

  getPercentPerUnit({ isVertical, max }) {
    const sizeName = isVertical ? 'offsetHeight' : 'offsetWidth';

    const [line, thumb] = [
      ...this.el.querySelectorAll(
        `.${html.line.className}, .${html.thumb.className}`
      ),
    ];

    return ((line[sizeName] - thumb[sizeName]) * 100) / line[sizeName] / max;
  }
}

export default View;
