class Component {
  init(html) {
    this.el = document.createElement(html.tag);
    this.addClass(html.className);
  }

  addClass(className) {
    this.el.classList.add(className);
  }

  addChild(child) {
    this.el.append(child.getEl());
  }

  removeChild(child) {
    if (child) {
      this.el.removeChild(child.getEl());
    }
  }

  getEl() {
    return this.el;
  }

  getBox() {
    return this.el.getBoundingClientRect();
  }
}

export default Component;
