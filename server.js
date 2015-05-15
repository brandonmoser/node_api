'use strict';

// This is the API server that will interface and return JSON data as requested
var http = require('http');
var app = require('./lib/Server');

var PORT = process.env.PORT || 3000;
var API_KEY = process.env.API_KEY;

var server = http.createServer(app);
server.listen(PORT, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('Server is running at port', PORT);
});
