var fs = require('fs')
var http = require('http')
var onFinished = require('../lib/index.js')

http.createServer(function onRequest (req, res) {
  var stream = fs.createReadStream('./test/testEEfirst.js')
  stream.pipe(res)
  onFinished(res, function (err, res, event) {
    console.log(event)
  })
}).listen(3000)