import html from '../lib/html';

class Component {
  static createEl({ tag, className }) {
    const el = document.createElement(tag);
    el.classList.add(className);
    return el;
  }

  getEl() {
    return this.el;
  }

  render(elements) {
    const parent = elements.filter(el => el.className === html.bar.parentName);
    console.log(parent.children);
    console.log(this);
  }
}

export default Component;
