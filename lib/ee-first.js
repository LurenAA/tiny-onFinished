const EventEmitter = require('events').EventEmitter

function thunk(arr, callback) {
  if(!(this instanceof thunk)) {
    return new thunk(...arguments)
  }
  if (!Array.isArray(arr)) {
    throw new TypeError('need a array first argument')
  }
  this.done = callback
  this.eventQueue = []
  this.isFinished = false
  for (let x of arr) {
    if (!Array.isArray(x)) {
      return
    }
    let tar = x[0]
    this.addEventToQueue(tar, x.slice(1))
  }
}

thunk.prototype.addEventToQueue = function (tar, events) {
  if (!(tar instanceof EventEmitter)) {
    throw new TypeError("arr[x][0] must be instanceof EventEmitter")
  }
  for (let event of events) {
    if (typeof event !== 'string') {
      throw new TypeError("eventNmae must be a string")
    }
    let handler = thunk.listener(event, tar).bind(this)
    tar.addListener(event, handler)
    this.eventQueue.push({
      event,
      tar,
      handler
    })
  }
}

thunk.prototype.clearAll = function () {
  for (let x of this.eventQueue) {
    x.tar.removeListener(x.event, x.handler)
  }
  this.eventQueue = []
  this.isFinished = true
}

thunk.prototype.cancle = function () {
  if(this.isFinished) {
    return false
  }
  this.clearAll()
}

thunk.listener = function(event, tar) {
  return function (error) {
    this.clearAll()

    if(this.done instanceof Function) {
      this.done.call(tar, error, tar, event, Array.from(arguments))
    }
  }
}
 
module.exports = thunk