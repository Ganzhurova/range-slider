// import vDom from '../vDom';
import { directionMix } from '../../lib/html';

class RootView {
  constructor(html) {
    this.options = {};

    this.tag = '';
    this.attrs = {};
    this.children = [];

    this.init(html.rootEl);
  }

  toggleClassInAttr(className, boolean) {
    const separator = ' ';
    let classes = this.attrs.class.split(separator);
    const isClassMissing = cls => cls !== className;
    const requiredClass = () => isClassMissing;

    if (boolean && classes.every(isClassMissing)) {
      classes.push(className);
    } else {
      classes = classes.filter(requiredClass);
    }

    this.attrs.class = classes.join(separator);
  }

  init(html) {
    // убрать в компонент
    this.tag = html.tag;
    this.attrs = {
      class: html.className,
    };
  }

  setDirection() {
    this.toggleClassInAttr(directionMix, this.options.isVertical);
  }

  update(options) {
    if (this.options.isVertical === options.isVertical) return;
    this.options.isVertical = options.isVertical; // частичный интерфейс?

    this.setDirection();
  }

  getVNode() {
    // return vDom.createVNode.call(this, this.tag, this.attrs, this.children);
    const { tag, attrs, children } = this;
    return {
      tag,
      attrs,
      children,
    };
  }
}

export default RootView;
