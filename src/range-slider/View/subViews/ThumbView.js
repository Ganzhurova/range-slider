import Component from '../Component';
import helpers from '../../helpers/helpers';
import { html } from '../../lib/html';

class ThumbView extends Component {
  static limitSize = 0;

  static unit = 0;

  constructor() {
    super();
    this.index = 0;

    this.init(html.thumb);
  }

  setIndex(index) {
    helpers.setIndex.call(this, index);
  }

  correctDirection() {
    helpers.correctDirection.call(this, ThumbView.direction);
  }

  setup(position) {
    const pxValue = ThumbView.positionToPxValue(position);

    this.el.style[ThumbView.direction] = `${pxValue}px`;
    this.emit('valueChanged', pxValue, this.index);
  }

  calcLimitCoords(pxValues) {
    const START_COORD = 0;
    const isFromThumb = () => this.index === 0;
    const getCoord = index => {
      let coord;
      Object.keys(pxValues).forEach((key, i) => {
        if (index !== i) {
          coord = pxValues[key];
        }
      });
      return coord;
    };

    this.limitCoords = {
      start: isFromThumb() ? START_COORD : getCoord(this.index),
      end: isFromThumb()
        ? getCoord(this.index) || ThumbView.limitSize
        : ThumbView.limitSize,
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

    if (newValue < this.limitCoords.start) {
      newValue = this.limitCoords.start;
    }

    if (newValue > this.limitCoords.end) {
      newValue = this.limitCoords.end;
    }

    this.el.style[ThumbView.direction] = `${newValue}px`;

    this.emit('valueChanged', newValue, this.index);
  }

  static calcUnit(parentSize, thumbSize, range) {
    ThumbView.limitSize = parentSize - thumbSize;
    ThumbView.unit = ThumbView.limitSize / range;
  }

  static positionToPxValue(position) {
    return position * ThumbView.unit;
  }

  static pxValueToPosition(pxValue) {
    return pxValue / ThumbView.unit;
  }
}

export default ThumbView;
