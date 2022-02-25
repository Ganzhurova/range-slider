import type { IOptions } from './interfaces';

const DEFAULT_CONFIG: IOptions = {
  type: 'single',
  isVertical: false,
  isLabel: false,
  isScale: false,
  min: 0,
  max: 100,
  scaleParts: 4,
  // scaleRange: [], // вынести в интерфейс
  // isDouble: false, // вынести в интерфейс для вида
};

export default DEFAULT_CONFIG;
