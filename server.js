// This is the API server that will interface and return JSON data as requested
var http = require('http');
var lib = require('./lib');

var PORT = process.env.PORT || 3000;

var server = http.createServer(function(req,res){
  console.log('req incoming');

  res.statusCode = 200;
  res.end('Hello World!');
});

server.listen(PORT);