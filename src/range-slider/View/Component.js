// import html from '../lib/html';

class Component {
  constructor(options) {
    this.options = options;
    this.children = [];
  }

  createEl({ tag, className }) {
    this.el = document.createElement(tag);
    this.el.classList.add(className);
  }

  setChildren(children) {
    if (!children || !Array.isArray(children)) return;

    this.children = children;
  }

  getEl() {
    return this.el;
  }

  render() {
    if (this.children.length === 0) return;

    const children = this.children.map(child => child.getEl());
    this.el.append(...children);
  }

  // render(elements) {
  //   const parent = elements.filter(el => el.className === html.bar.parentName);
  //   console.log(parent.children);
  //   console.log(this);
  // }
}

export default Component;
