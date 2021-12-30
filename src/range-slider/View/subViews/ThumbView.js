import Component from '../Component';
import helpers from '../../helpers/helpers';
import { html } from '../../lib/html';
import { positionIndex, dragDirections, directions } from '../../lib/constants';

class ThumbView extends Component {
  static limitSize = 0;

  static unit = 0;

  constructor() {
    super();
    this.index = 0;
    this.oldDragCoords = {
      x: 0,
      y: 0,
    };

    this.init(html.thumb);
  }

  setIndex() {
    Object.entries(positionIndex).forEach(([index, value]) => {
      if (this.el.classList.contains(value)) {
        this.index = +index;
      }
    });
  }

  setup(position) {
    this.fixStyle(directions, ThumbView.direction);
    this.setIndex();

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

  handlerThumbDragStart(parentCoords, step, e) {
    const evt = helpers.getEvent(e);
    const thumbCoords = this.getCoords();

    const shift = {
      x: evt.pageX - thumbCoords.left,
      y: evt.pageY - thumbCoords.top,
    };

    const handlerThumbDrag = this.handlerThumbDrag.bind(
      this,
      parentCoords,
      step,
      shift
    );

    const handlerThumbDragEnd = () => {
      document.removeEventListener('mousemove', handlerThumbDrag);
      document.removeEventListener('mouseup', handlerThumbDragEnd);
      document.removeEventListener('touchmove', handlerThumbDrag);
      document.removeEventListener('touchend', handlerThumbDragEnd);
    };

    document.addEventListener('mousemove', handlerThumbDrag);
    document.addEventListener('mouseup', handlerThumbDragEnd);
    document.addEventListener('touchmove', handlerThumbDrag);
    document.addEventListener('touchend', handlerThumbDragEnd);
  }

  handlerThumbDrag(parentCoords, step, shift, e) {
    const evt = helpers.getEvent(e);
    const { coordName } = ThumbView;
    const pointerCoordName = `page${coordName.toUpperCase()}`;

    const dragDirection =
      evt[pointerCoordName] > this.oldDragCoords[coordName]
        ? dragDirections.FORWARD
        : dragDirections.BACKWARD;

    const stepPxValue = ThumbView.positionToPxValue(step);

    const thumbCoord = this.getCoords()[ThumbView.direction];
    const pointerCoord =
      evt[pointerCoordName] -
      shift[coordName] -
      parentCoords[ThumbView.direction];

    let newValue = step
      ? thumbCoord - parentCoords[ThumbView.direction]
      : pointerCoord;

    if (
      dragDirection === dragDirections.FORWARD &&
      evt[pointerCoordName] > thumbCoord + this.getSize()
    ) {
      newValue += stepPxValue;
    }

    if (
      dragDirection === dragDirections.BACKWARD &&
      evt[pointerCoordName] < thumbCoord
    ) {
      newValue -= stepPxValue;
    }

    if (newValue < this.limitCoords.start) {
      newValue = this.limitCoords.start;
    }

    if (newValue > this.limitCoords.end) {
      newValue = this.limitCoords.end;
    }

    this.el.style[ThumbView.direction] = `${newValue}px`;

    this.oldDragCoords.x = evt.pageX;
    this.oldDragCoords.y = evt.pageY;

    this.emit('valueChanged', newValue, this.index);
  }

  static calcUnit(limitSize, range) {
    ThumbView.limitSize = limitSize;
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
