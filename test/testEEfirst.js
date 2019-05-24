const EventEmitter = require('events').EventEmitter
let first = require('../lib/ee-first')

var ee1 = new EventEmitter()
var ee2 = new EventEmitter()
var ee3 = new EventEmitter()

first([
  [ee1, 'a', 'b', 'c'],
  [ee2, 'a', 'b', 'c'],
  [ee3, 'a', 'b', 'c']
], function (err, ee, event, args) {
  console.log(123)
})

ee2.emit('b', 1, 2, 3)