import Component from '../Component';
import helpers from '../../helpers/helpers';
import { html } from '../../lib/html';
import { directions } from '../../lib/constants';

class ThumbView extends Component {
  constructor() {
    super();
    this.index = 0;
    this.newCoord = 0;

    this.init(html.thumb);
  }

  setIndex(i) {
    this.index = i;
  }

  setLimitCoords(limitCoords) {
    this.limitCoords = limitCoords;
  }

  setPosition(newPos) {
    this.newCoord = newPos;
    this.el.style[ThumbView.direction] = `${this.newCoord}%`;
    this.emit('percentChanged', this.newCoord, this.index);
  }

  setup(percentValue, i) {
    this.fixStyle(directions, ThumbView.direction);
    this.setIndex(i);
    this.setPosition(percentValue);
  }

  getValidCoord(coord) {
    if (coord < this.limitCoords.start) {
      return this.limitCoords.start;
    }
    if (coord > this.limitCoords.end) {
      return this.limitCoords.end;
    }
    return coord;
  }

  getSteps(step) {
    const steps = [];

    const prevStep = this.getValidCoord(this.newCoord - step);
    const nextStep = this.getValidCoord(this.newCoord + step);

    steps.push(prevStep, nextStep);
    return steps;
  }

  handlerThumbDragStart(parentCoord, step, e) {
    const evtCoord = helpers.getEventCoord(e, ThumbView);
    const thumbCoord = this.getCoord();

    const shift = evtCoord - thumbCoord;

    const handlerThumbDrag = this.handlerThumbDrag.bind(
      this,
      parentCoord,
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

  handlerThumbDrag(parentCoord, step, shift, e) {
    const evtCoord = helpers.getEventCoord(e, ThumbView);
    const coord = (evtCoord - shift - parentCoord) * Component.unit;

    const stepOffset = step / 2;
    const steps = this.getSteps(step);

    let { newCoord } = this;

    if (!step) {
      newCoord = this.getValidCoord(coord);
    } else if (coord > newCoord + stepOffset || coord < newCoord - stepOffset) {
      newCoord = helpers.getClosestValue(steps, coord);
    }

    this.setPosition(newCoord);
  }
}

export default ThumbView;
