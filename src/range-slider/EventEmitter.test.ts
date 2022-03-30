/* eslint-disable  @typescript-eslint/no-explicit-any */

import EventEmitter from './EventEmitter';

describe('EventEmitter', () => {
  let emitter: EventEmitter;
  let callback: jest.Mock<any, any>;
  const CHANGED = 'changed';
  const OTHER_CHANGED = 'otherChanged';

  beforeEach(() => {
    callback = jest.fn();
    emitter = new EventEmitter();
    emitter.subscribe(CHANGED, callback);
  });

  test('should call callback', () => {
    emitter.emit(CHANGED);
    expect(callback).toBeCalled();
    expect(callback).toBeCalledTimes(1);
  });

  test('should not call callback', () => {
    emitter.unsubscribe(CHANGED, callback);
    emitter.emit(CHANGED);
    expect(callback).toBeCalledTimes(0);
  });

  test('should call a callback when attempting to delete for a non-existent event', () => {
    emitter.unsubscribe(OTHER_CHANGED, callback);
    emitter.emit(CHANGED);
    expect(callback).toBeCalledTimes(1);
  });
});
