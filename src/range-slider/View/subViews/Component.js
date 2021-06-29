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

  getVNode() {
    return JSON.parse(JSON.stringify(this));
  }
}

export default Component;
