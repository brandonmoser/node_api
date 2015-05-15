// This is the API server that will interface and return JSON data as requested
var restify = require('restify');
var async = require('async');
var mongoose = require('mongoose');
var lib = require('./lib');
var db = require('./lib/Db');

var Product = require('./models/Product');
var ProductModel = mongoose.model('Product');

var PORT = process.env.PORT || 3000;

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
  var product_response = {};
  var product_id = req.params.id;
      console.log('Product Id Requested:', product_id);

  var product_data = lib.callProductsAPI(product_id, function(err, api_data) {
    if (err){
      return next(err);
    }
    // console.log('api_data', api_data);

    // Use .lean() since we are not going to update it
    ProductModel.findOne({product_id: product_id}).lean().exec(function(err, product){
      if (err) {
        return next(err);
      }
      // console.log('m product', product);

      product_response.id = product_id;
      product_response.name = api_data.online_description ? api_data.online_description.value : '';
      if (product){
        product_response.current_price = {
          "currency_code": product.current_price.currency_code,
          "value": product.current_price.value
        };
      } else {
        product_response.current_price = {}
      }

      console.log('product_response', product_response);
      res.json(product_response);
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
