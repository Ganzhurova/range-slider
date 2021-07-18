class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    (this.events[eventName] || (this.events[eventName] = [])).push(callback);
    return this;
  }

  unsubscribe(eventName, callback) {
    if (!this.events[eventName]) return;

    this.events[eventName] = this.events[eventName].filter(
      eventCallback => callback.name !== eventCallback.name
    );
  }

  emit(eventName, ...args) {
    (this.events[eventName] || []).forEach(callback =>
      callback.call(null, ...args)
    );
  }
}

export default EventEmitter;
