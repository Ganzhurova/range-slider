import EventEmitter from '../EventEmitter';
import RootView from './subViews/RootView';
// import LineView from './subViews/LineView';
// import BarView from './subViews/BarView';
// import ThumbView from './subViews/ThumbView';
import vDom from './vDom';
// import * as subViews from './SubViews';
import { html } from '../lib/html';

class View extends EventEmitter {
  constructor(selector) {
    super();
    this.el = document.querySelector(selector);
    // this.options = {};
    this.subViews = {};

    this.init();
  }

  init() {
    if (this.el.nodeName.toLowerCase() !== html.rootEl.tag) {
      console?.warn('Base element should be <div>!');
      return;
    }

    // this.initRoot();
    this.setSubViews();

    // const vNode = this.subViews.root.getVNode();
    // const vNodeUnbind = { ...vNode };
    // this.el = vDom.update(vNodeUnbind, this.el);
    // this.setEl();
    // this.render(options);
    // console.log(this.elements);
  }

  setSubViews() {
    this.subViews = {
      root: new RootView(html),
    };
    // this.from = new ThumbView(this.options);
    // this.to = new ThumbView(this.options);
    // this.bar = new BarView(this.options);
    // this.line = new LineView(this.options);
    // console.log(this.subViews.from === this.subViews.to);
  }

  update(options) {
    // this.options = options;
    this.subViews.root.update(options);
    // console.log(this.el.v);
    const vNode = this.subViews.root.getVNode();
    const vNodeUnbind = { ...vNode };
    this.el = vDom.update(vNodeUnbind, this.el);
    // console.log(this.el.v);
  }

  initRoot() {
    this.root = new RootView(this.options, html);
    vDom.update(this.root.getVNode(), this.el);
  }

  setEl() {
    Object.values(this.subViews).forEach(subView => {
      subView.assignEl(this.elements);
    });
  }

  render() {
    // visualState - интерфейс ? - содержит опции отображения шкалы, ярлыков и вертикали

    const { line, bar, from } = this.elements;

    // const elem = Object.fromEntries(this.elements.entries());
    // const el = { ...elem };
    //
    // // console.log(line);
    line.append(bar, from);

    this.checkDoubleElement();

    // if (visual.isDouble) {
    //   elem[0].append(to);
    // }
    //
    this.el.append(line);
    //
    // console.log(line);
    // console.log(this.elements.line);
    // console.log(elem);
  }

  checkDoubleElement() {
    const { line, from, to } = this.elements;
    const { isDouble } = this.options;

    // const containsTo = line.contains(from);

    console.log(line);
    console.log(from === to);
    console.log(isDouble);
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
