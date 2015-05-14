// This is the API server that will interface and return JSON data as requested
var http = require('http');
var lib = require('./lib');

var PORT = process.env.PORT || 3000;
var API_KEY = process.env.API_KEY;

var server = http.createServer(function(req,res){
  console.log('req incoming');

  res.statusCode = 200;
  res.end('Hello World!');
});

server.listen(PORT, function(){
	console.log('Listening on port', PORT);
});