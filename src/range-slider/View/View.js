import EventEmitter from '../EventEmitter';
import * as subViews from './SubViews';
import html from '../lib/html';

class View extends EventEmitter {
  constructor(selector) {
    super();
    this.el = document.querySelector(selector);
    this.subViews = {};
    this.elements = new Map();
  }

  init(options) {
    if (this.el.nodeName.toLowerCase() !== html.rootEl.tag) {
      console?.warn('Base element should be <div>!');
      return;
    }

    this.initSubViews(options);
    console.log(this.elements);
    // this.setElements();
    // this.render(options);
  }

  initSubViews(options) {
    Object.entries(subViews).forEach(([key, Component]) => {
      this.subViews[key] = new Component(options);
    });
  }

  setElements() {
    Object.values(this.subViews).forEach(subView => {
      subView.assignEl(this.elements);
    });
  }

  render(visual) {
    // visualState - интерфейс ? - содержит опции отображения шкалы, ярлыков и вертикали
    this.el.classList.add(html.rootEl.className);
    this.setDirection(visual.isVertical);

    const { line, bar, from, to } = this.elements;
    const elem = [line];
    elem[0].append(bar, from);

    if (visual.isDouble) {
      elem[0].append(to);
    }

    this.el.append(...elem);

    console.log(line);
    console.log(this.elements.line);
    console.log(elem);
  }

  setDirection(isVertical) {
    this.el.classList.toggle(html.rootEl.directionModifier, isVertical);
  }
}

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
