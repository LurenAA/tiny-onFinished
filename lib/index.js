const first = require('./ee-first')
const http = require('http')

function onFinish(obj, handler) {
  const socketEvents = [ 'end', 'error', 'timeout']
  let type,
    httpEvents,
    socket
  if(obj instanceof http.ServerResponse) {
    type = 'res'
  } else if (obj instanceof http.IncomingMessage) {
    type = 'req'
  } else {
    return false
  }
  socket = obj.socket
  if(!socket) {
    if(type === 'res')
      return handler(null, obj)
    throw new TypeError('res/req need a socket attr')
  } 
  
  httpEvents = type === 'res' ? 
    ['close', 'finish'] : 
    ['close', 'aborted']
  let eefirst = []
  eefirst.push([obj].concat(httpEvents))
  eefirst.push([socket].concat(socketEvents))
  let firstObj = first(eefirst, handler)
  return firstObj
}

module.exports = onFinish