import Component from '../Component';
import helpers from '../../helpers/helpers';
import { html } from '../../lib/html';
import { directions } from '../../lib/constants';

class ThumbView extends Component {
  constructor() {
    super();
    this.index = 0;

    this.init(html.thumb);
  }

  setIndex(index) {
    helpers.setIndex.call(this, index);
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

  pxValueToPosition(pxValue) {
    return pxValue / this.unit;
  }

  setup(position) {
    const pxValue = this.positionToPxValue(position);

    Object.values(directions).forEach(direction => {
      if (direction === ThumbView.direction) {
        this.el.style[direction] = `${pxValue}px`;
      } else {
        this.el.style[direction] = '';
      }
    });

    this.emit('valueChanged', pxValue, this.index);
  }

  calcLimitCoords(coords) {
    console.log(coords);
    if (this.index === 0) {
      this.limitCoords = {
        start: 0,
        end: coords[1] || this.limitSize,
      };
    }

    if (this.index === 1) {
      this.limitCoords = {
        start: coords[0],
        end: this.limitSize,
      };
    }
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

    if (newValue < this.limitCoords.start) {
      newValue = this.limitCoords.start;
    }

    if (newValue > this.limitCoords.end) {
      newValue = this.limitCoords.end;
    }

    this.el.style[ThumbView.direction] = `${newValue}px`;

    this.emit('valueChanged', newValue, this.index);
  }
}

export default ThumbView;
