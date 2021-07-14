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

  getSize(sizeName) {
    const box = this.getBox();

    return box[sizeName];
  }

  getCoords() {
    const box = this.getBox();

    return {
      left: box.left + window.pageXOffset,
      top: box.top + window.pageYOffset,
    };
  }
}

export default Component;
