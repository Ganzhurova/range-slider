import type { ValidType } from './types';

interface IOptions {
  type: ValidType;
  isVertical: boolean;
  isLabel: boolean;
  isScale: boolean;
  min: number;
  max: number;
  scaleParts: number;
}

export type { IOptions };
