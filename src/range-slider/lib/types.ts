import { HTML } from './html';
import { IStateModel } from './interfaces';

export type ObjValue<T> = T[keyof T];
export type ObjKey<T> = keyof T;
export type PositionKeys = 'from' | 'to';
export type Html = ObjValue<typeof HTML>;
export type OptionsKeys = ObjKey<IStateModel>;

