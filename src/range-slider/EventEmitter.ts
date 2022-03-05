/* eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }] */

type FunctionType = (...args: any[]) => void;

interface Events {
  [eventName: string]: FunctionType[];
}

class EventEmitter {
  private events: Events;

  constructor() {
    this.events = {};
  }

  public subscribe(eventName: string, callback: FunctionType): void {
    (this.events[eventName] || (this.events[eventName] = [])).push(callback);
  }

  public unsubscribe(eventName: string, callback: FunctionType): void {
    if (!this.events[eventName]) return;

    this.events[eventName] = this.events[eventName].filter(
      (eventCallback) => callback !== eventCallback
    );
  }

  public emit(eventName: string, ...args: any[]): void {
    (this.events[eventName] || []).forEach((callback) => callback(...args));
  }
}

export default EventEmitter;
