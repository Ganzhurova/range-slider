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

  setDirection(direction) {
    this.direction = direction;
  }

  setEl(pxValue, mainDirection) {
    this.setPxValue(pxValue);
    this.setDirection(mainDirection);

    Object.values(directions).forEach(direction => {
      if (direction === mainDirection) {
        this.el.style[direction] = `${pxValue}px`;
      } else {
        this.el.style[direction] = '';
      }
    });
  }

  handlerThumbDragStart(coords, e) {
    const thumbBox = this.getBox();

    const thumbCoords = {
      x: thumbBox.left + window.pageXOffset,
      y: thumbBox.top + window.pageYOffset,
    };

    this.shift = {
      x: e.pageX - thumbCoords.x,
      y: e.pageY - thumbCoords.y,
    };

    const handlerThumbDrag = this.handlerThumbDrag.bind(this, coords);

    const handlerThumbDragEnd = () => {
      document.removeEventListener('mousemove', handlerThumbDrag);
      document.removeEventListener('mouseup', handlerThumbDragEnd);
    };

    document.addEventListener('mousemove', handlerThumbDrag);
    document.addEventListener('mouseup', handlerThumbDragEnd);
  }

  handlerThumbDrag(coords, e) {
    const newCoords = {
      left: e.pageX - this.shift.x - coords.left,
      top: e.pageY - this.shift.y - coords.top,
    };

    let newValue = newCoords[this.direction];

    if (newValue < coords.start) {
      newValue = coords.start;
    }

    if (newValue > coords.end) {
      newValue = coords.end;
    }

    this.el.style[this.direction] = `${newValue}px`;

    this.setPxValue(newValue);
    // console.log(this.pxValue);
  }
}

export default ThumbView;
