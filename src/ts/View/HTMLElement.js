class HTMLElement {
  getEl(options) {
    this.element = document.createElement(options.tag);
    this.element.className = options.className;
    if (options.text) {
      this.element.textContent = options.text;
    }
    return this.element;
  }
}

export default HTMLElement;
