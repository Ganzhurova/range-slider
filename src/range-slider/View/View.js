import RootView from './subViews/RootView';
import LineView from './subViews/LineView';
import ThumbView from './subViews/ThumbView';
import { html, mix } from '../lib/html';
import { size, directions } from '../lib/constants';

class View {
  constructor(selector) {
    this.options = {};
    this.el = document.querySelector(selector);
    this.direction = {};
    this.lineCoords = {};
    this.unit = 0;

    this.init();
  }

  init() {
    if (this.el.nodeName.toLowerCase() !== html.rootEl.tag) {
      throw new Error('Base element should be <div>!');
    }

    this.initSubViews();
    this.setHandlers();
  }

  initSubViews() {
    this.root = new RootView(this.el);
    this.line = new LineView();
    this.thumbs = [];

    this.addDoubleElement(new ThumbView(), mix.from, this.thumbs);
    this.root.addChild(this.line);
  }

  addDoubleElement(instance, modifier, arr) {
    instance.addClass(modifier);
    arr.push(instance);
    this.line.addChild(instance);
  }

  removeDoubleElement(arr) {
    const [instance] = arr.splice(1, 1);
    this.line.removeChild(instance);
  }

  setDirection({ isVertical }) {
    if (this.options.isVertical === isVertical) return;

    this.root.setDirection(isVertical);

    if (isVertical) {
      this.direction = {
        name: directions.TOP,
        size: size.HEIGHT,
      };
    } else {
      this.direction = {
        name: directions.LEFT,
        size: size.WIDTH,
      };
    }
  }

  setDoubleElements({ isDouble }) {
    if (this.options.isDouble === isDouble) return;

    if (isDouble) {
      this.addDoubleElement(new ThumbView(), mix.to, this.thumbs);
    } else {
      this.removeDoubleElement(this.thumbs);
    }
  }

  calcLineCoords() {
    const lineBox = this.line.getBox();
    const thumbBox = this.thumbs[0].getBox();

    this.lineCoords = {
      left: lineBox.left + window.pageXOffset,
      top: lineBox.top + window.pageYOffset,
      start: 0,
      end: lineBox[this.direction.size] - thumbBox[this.direction.size],
    };
  }

  calcUnit() {
    const { min, max } = this.options;
    this.unit = this.lineCoords.end / (max - min);
  }

  pxValueToPosition(pxValue) {
    return (pxValue - this.options.min) * this.unit;
  }

  setPos() {
    const pos = [this.pxValueToPosition(this.options.from)];
    if (this.options.isDouble) {
      pos.push(this.pxValueToPosition(this.options.to));
    }

    this.thumbs.forEach((thumb, i) => {
      thumb.setPos(pos[i], this.direction.name);
    });
  }

  update(options) {
    this.setDirection(options);
    this.setDoubleElements(options);
    this.options = { ...options };

    this.calcLineCoords();
    this.calcUnit();
    this.setPos();
  }

  setHandlers() {
    this.handlerThumbDragStart = this.handlerThumbDragStart.bind(this);

    this.el.addEventListener('mousedown', this.handlerThumbDragStart);
  }

  handlerThumbDragStart(e) {
    e.preventDefault();
    if (!e.target.classList.contains(html.thumb.className)) return;

    const activeThumbEl = e.target;
    const thumbBox = activeThumbEl.getBoundingClientRect();

    const thumbCoords = {
      x: thumbBox.left + window.pageXOffset,
      y: thumbBox.top + window.pageYOffset,
    };

    const shift = {
      x: e.pageX - thumbCoords.x,
      y: e.pageY - thumbCoords.y,
    };

    const handlerThumbDrag = this.handlerThumbDrag.bind(
      this,
      activeThumbEl,
      shift
    );

    const handlerThumbDragEnd = () => {
      document.removeEventListener('mousemove', handlerThumbDrag);
      document.removeEventListener('mouseup', handlerThumbDragEnd);
    };

    document.addEventListener('mousemove', handlerThumbDrag);
    document.addEventListener('mouseup', handlerThumbDragEnd);
  }

  handlerThumbDrag(activeThumbEl, shift, e) {
    console.log(activeThumbEl);
    const newCoords = {
      left: e.pageX - shift.x - this.lineCoords.left,
      top: e.pageY - shift.y - this.lineCoords.top,
    };

    if (newCoords[this.direction.name] < this.lineCoords.start) {
      newCoords[this.direction.name] = this.lineCoords.start;
    }

    if (newCoords[this.direction.name] > this.lineCoords.end) {
      newCoords[this.direction.name] = this.lineCoords.end;
    }

    activeThumbEl.style[this.direction.name] = `${
      newCoords[this.direction.name]
    }px`;
  }
}

export default View;
