class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    (this.events[eventName] || (this.events[eventName] = [])).push(callback);
    return this;
  }

  emit(eventName, arg) {
    (this.events[eventName] || []).slice().forEach(callback => callback(arg));
  }
}

export default EventEmitter;
