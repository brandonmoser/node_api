// This is the API server that will interface and return JSON data as requested
var restify = require('restify');
var async = require('async');
var mongoose = require('mongoose');
var lib = require('./lib');
var request = require('request');

var Product = require('./models/Product');
var ProductModel = mongoose.model('Product');

var PORT = process.env.PORT || 3000;
var API_KEY = process.env.API_KEY;

var server = restify.createServer();

// Clean up sloppy paths like //products//////1//
server.pre(restify.pre.sanitizePath());

// Handles annoying user agents (curl)
server.pre(restify.pre.userAgentConnection());

// Allow 5 requests/second by IP, and burst to 10
server.use(restify.throttle({
  burst: 10,
  rate: 5,
  ip: true,
}));

//// Use the common stuff you probably want
server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.authorizationParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

server.get('/', function (req, res, next) {
  console.log('GET /');
  res.send('Home');
  res.end();
});

server.get('/products/:id', function get_product(req, res, next) {
  var product_id = req.params.id;
  var get_data = '';
  var url = 'https://api.target.com/products/v3/'+product_id+'?fields=descriptions&id_type=TCIN&key='+API_KEY;
  console.log('url', url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      get_data = body
    }
    get_data = JSON.parse(get_data);
    console.log('get_data', get_data.product_composite_response.items);

    var res_obj = {};
    res_obj.id =
    ProductModel.find({product_id: product_id}, function(err, product){
      console.log('found mongo')
      if (err) {
        res.statusCode = 500;
        res.send(err);
        res.end();
      }
      console.log('Product Id', product_id);
      res.send('Product Id ' + product_id);
      res.end();
    });
  });
});

server.listen(PORT, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('Server is running at port', PORT);
});
