import { IStateModel } from './interfaces';

const DEFAULT_CONFIG: IStateModel = {
  isDouble: false,
  isVertical: false,
  isLabel: false,
  isScale: false,
  min: 0,
  max: 100,
  scaleParts: 4,
  from: 25,
  to: 75,
  step: 0,
};

export default DEFAULT_CONFIG;

