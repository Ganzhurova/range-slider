import Component from '../Component';
import { html } from '../../lib/html';
import { directions } from '../../lib/constants';

class ThumbView extends Component {
  constructor() {
    super();
    this.init(html.thumb);
  }

  setPxValue(pxValue) {
    this.pxValue = pxValue;
  }

  getPxValue() {
    return this.pxValue;
  }

  calcUnit(parentSize, range) {
    const thumbSize = this.getSize();
    this.limitSize =
      parentSize[ThumbView.sizeName] - thumbSize[ThumbView.sizeName];
    this.unit = this.limitSize / range;
  }

  positionToPxValue(position) {
    return position * this.unit;
  }

  setup(position) {
    const pxValue = this.positionToPxValue(position);

    this.setPxValue(pxValue);

    Object.values(directions).forEach(direction => {
      if (direction === ThumbView.direction) {
        this.el.style[direction] = `${pxValue}px`;
      } else {
        this.el.style[direction] = '';
      }
    });
  }

  calcLimitCoords() {
    this.limitCoords = {
      start: 0,
      end: this.limitSize,
    };
  }

  handlerThumbDragStart(parentCoords, e) {
    const thumbCoords = this.getCoords();

    this.shift = {
      x: e.pageX - thumbCoords.left,
      y: e.pageY - thumbCoords.top,
    };

    const handlerThumbDrag = this.handlerThumbDrag.bind(this, parentCoords);

    const handlerThumbDragEnd = () => {
      document.removeEventListener('mousemove', handlerThumbDrag);
      document.removeEventListener('mouseup', handlerThumbDragEnd);
    };

    document.addEventListener('mousemove', handlerThumbDrag);
    document.addEventListener('mouseup', handlerThumbDragEnd);
  }

  handlerThumbDrag(parentCoords, e) {
    const newCoords = {
      left: e.pageX - this.shift.x - parentCoords.left,
      top: e.pageY - this.shift.y - parentCoords.top,
    };

    let newValue = newCoords[ThumbView.direction];
    this.calcLimitCoords();

    if (newValue < this.limitCoords.start) {
      newValue = this.limitCoords.start;
    }

    if (newValue > this.limitCoords.end) {
      newValue = this.limitCoords.end;
    }

    this.el.style[ThumbView.direction] = `${newValue}px`;

    this.setPxValue(newValue);
    console.log(this.pxValue);
  }
}

export default ThumbView;
