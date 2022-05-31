class EventEmitter {
  events = {}

  on (eventName, callback) {
    this.events[eventName] = callback
  }

  off (eventName) {
    delete this.events[eventName]
  }

  emit (eventName, args) {
    const event = this.events[eventName]
    if (event) {
      // eslint-disable-next-line no-useless-call
      event.call(null, args)
    }
  }
}

export default new EventEmitter()
