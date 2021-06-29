import Template from './Template';
import vDom from './vDom';
import { html } from '../lib/html';

class View {
  constructor(selector) {
    this.el = document.querySelector(selector);
    this.template = new Template();

    this.init();
  }

  init() {
    if (this.el.nodeName.toLowerCase() !== html.rootEl.tag) {
      throw new Error('Base element should be <div>!');
    }
  }

  update(options) {
    const template = this.template.build(options);
    this.el = vDom.update(template, this.el);
  }
}

export default View;
