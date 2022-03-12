import { IDirections } from './interfaces';

enum Events {
  NEW_STATE = 'newState',
  NEW_PERCENT_POSITION = 'newPercentPosition',
  VERTICAL_CHANGED = 'isVerticalChanged',
  DOUBLE_CHANGED = 'isDoubleChanged',
  LABEL_CHANGED = 'isLabelChanged',
  SCALE_CHANGED = 'isScaleChanged',
}

const directions: IDirections = {
  LEFT: {
    name: 'left',
    size: 'width',
    coord: 'x',
  },
  TOP: {
    name: 'top',
    size: 'height',
    coord: 'y',
  },
};

const positionIndex = {
  0: 'from',
  1: 'to',
};

export { Events, directions, positionIndex };
