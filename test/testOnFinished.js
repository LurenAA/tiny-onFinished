var fs = require('fs')
var http = require('http')
var onFinished = require('../lib/index.js')

http.createServer(function onRequest (req, res) {
  var stream = fs.createReadStream('test.js')
  stream.pipe(res)
  onFinished(res, function () {
    console.log(1)
  })
}).listen(3000)