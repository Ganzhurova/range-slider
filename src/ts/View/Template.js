import HTMLDefaults from './HTMLDefaults';

class Template {
  constructor(viewModel) {
    this.type = viewModel.type;
    this.label = viewModel.label;
  }

  init() {
    return `
      <div class=${HTMLDefaults.line}>
        <div class=${HTMLDefaults.bar}></div>
        ${Template.getModifiedHTML(this.type, Template.getHTML, 'thumb')}
        ${Template.getModifiedHTML(this.type, Template.getHTML, 'label')}
      </div>
    `;
  }

  static getHTML(key, modifier = '') {
    return `<div class="${HTMLDefaults[key]} ${modifier}"></div>`;
  }

  static getModifiedHTML(type, callback, key) {
    let html = callback(key);

    if (type === 'double') {
      html = `
      ${callback(key, HTMLDefaults.modifiers.from)}
      ${callback(key, HTMLDefaults.modifiers.to)}
      `;
      return html;
    }

    return html;
  }
}

export default Template;
