class HTMLElement {
  createEl({ tag = 'div', className = '' }) {
    this.el = document.createElement(tag);
    this.el.classList.add(className);
  }

  getEl() {
    return this.el;
  }
}

export default HTMLElement;
