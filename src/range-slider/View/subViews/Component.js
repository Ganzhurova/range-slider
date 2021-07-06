class Component {
  constructor() {
    this.tag = '';
    this.attrs = {};
    this.children = [];
  }

  init(html) {
    this.tag = html.tag;
    this.attrs = {
      class: html.className,
    };
  }

  addClass(className) {
    this.attrs.class = `${this.attrs.class} ${className}`;
  }

  removeClass(className) {
    this.attrs.class = this.attrs.class.replace(className, '').trim();
  }

  addChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    const childIndex = this.children.indexOf(child);
    if (childIndex === -1) return;
    this.children.splice(childIndex, 1);
  }

  getEl() {
    if (!this.el) {
      this.el = document.querySelector(`.${this.attrs.class}`);
    }
    return this.el;
  }

  getVNode() {
    const vNode = {
      tag: this.tag,
      attrs: this.attrs,
      children: this.children,
    };
    return JSON.parse(JSON.stringify(vNode));
  }
}

export default Component;
