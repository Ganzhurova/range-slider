import EventEmitter from '../EventEmitter';
import SubViewsList from './subViews/SubViewsList';
import html from '../lib/html';

class View extends EventEmitter {
  constructor(selector) {
    super();
    this.el = document.querySelector(selector);
    this.subViews = {};
  }

  init(state) {
    if (this.el.nodeName.toLowerCase() !== html.rootEl.tag) {
      console?.warn('Base element should be <div>!');
      return;
    }

    this.initSubViews(state);
    this.render(state);
  }

  initSubViews(state) {
    this.subViews = new SubViewsList(state).get();
  }

  render(visualState) {
    // visualState - интерфейс ? - содержит опции отображения шкалы, ярлыков и вертикали
    this.el.classList.add(html.rootEl.className);
    this.setDirection(visualState.isVertical);

    const elements = this.getElements();
    const fragment = document.createDocumentFragment();
    Object.values(this.subViews).forEach(item => {
      item.render(elements);
    });

    console.log(fragment);
    console.log(elements);
  }

  getElements() {
    return Object.values(this.subViews).map(item => item.getEl());
  }

  setDirection(isVertical) {
    this.el.classList.toggle(html.rootEl.directionModifier, isVertical);
  }
}
// import HTMLDefaults from './HTMLDefaults';
// // import types from '../defaults';
// // import Template from './Template';
//
//
// import BarView from './subViews/BarView';
// import ThumbView from './subViews/ThumbView';
// import LabelView from './subViews/LabelView';
// import ScaleView from './subViews/ScaleView';
//
// class View extends EventEmitter {
//   constructor(selector) {
//     super();
//     this.el = document.querySelector(selector);
//   }
//
//   init(viewModel) {
//     this.line = new LineView(viewModel);
//     this.bar = new BarView(viewModel);
//     this.thumb = new ThumbView(viewModel);
//     this.label = new LabelView(viewModel);
//     this.scale = new ScaleView(viewModel);
//     console.log(this.line);
//     console.log(this.bar);
//     console.log(this.thumb);
//     console.log(this.label);
//
//     this.elements = {
//       line: this.line.getEl(),
//       bar: this.bar.getEl(),
//       thumbs: this.thumb.getEl(),
//       labels: this.label.getEl(),
//       scale: this.scale.getEl(),
//     };
//
//     // console.log(this.elements);
//     // const template = new Template(viewModel).init();
//     // this.el.innerHTML = template;
//
//     this.el.classList.add(HTMLDefaults.rootClass);
//     this.#setDirection(viewModel.isVertical);
//
//     this.#render();
//   }
//
//   #render() {
//     this.elements.line.append(
//       this.elements.bar,
//       this.elements.thumbs,
//       this.elements.labels ?? ''
//     );
//
//     this.el.append(this.elements.line, this.elements.scale ?? '');
//   }
//

// }
//
export default View;
