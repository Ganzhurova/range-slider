import Component from '../Component';
import helpers from '../../helpers/helpers';
import { html } from '../../lib/html';
import { directions } from '../../lib/constants';

class ThumbView extends Component {
  constructor() {
    super();
    this.index = 0;
    this.newCoord = 0;
    this.oldCoord = 0;

    this.init(html.thumb);
  }

  setIndex(i) {
    this.index = i;
  }

  setCoord(coord) {
    this.newCoord = coord;
  }

  setLimitCoords(limitCoords) {
    this.limitCoords = limitCoords;
  }

  setup(percentValue, i) {
    this.fixStyle(directions, ThumbView.direction);
    this.setIndex(i);
    this.setCoord(percentValue);

    this.el.style[ThumbView.direction] = `${percentValue}%`;
    this.emit('percentChanged', percentValue, this.index);
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

    if (!step) {
      this.newCoord = this.getValidCoord(coord);
    } else if (
      coord > this.newCoord + stepOffset ||
      coord < this.newCoord - stepOffset
    ) {
      this.newCoord = steps.reduce((prev, curr) =>
        Math.abs(curr - coord) < Math.abs(prev - coord) ? curr : prev
      );
    }

    this.el.style[ThumbView.direction] = `${this.newCoord}%`;
    this.emit('percentChanged', this.newCoord, this.index);
  }
}

export default ThumbView;
