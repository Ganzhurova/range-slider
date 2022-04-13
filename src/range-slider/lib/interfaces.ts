type CallbackOption = (data: Readonly<IStateModel>) => void;

export interface IStateModel {
  isDouble: boolean;
  isVertical: boolean;
  isLabel: boolean;
  isScale: boolean;
  min: number;
  max: number;
  from: number;
  to: number;
  step: number;
  scaleParts: number;
}

export interface IOptions extends IStateModel {
  onStart: CallbackOption;
  onChange: CallbackOption;
}

type DOMRectKey = keyof DOMRect;

export interface IDirection {
  name: DOMRectKey;
  size: DOMRectKey;
  coord: DOMRectKey;
}

export interface IDirections {
  LEFT: IDirection;
  TOP: IDirection;
}

export interface ILimitCoords {
  start: number;
  end: number;
}

export interface IDataView {
  direction: IDirection;
  percentPerPx: number;
  percentPerPosition: number;
  percentageLimitSize: number;
  fractionLength: number;
}

export interface Settings {
  data: Readonly<IDataView>;
  options: Readonly<IStateModel>;
}

