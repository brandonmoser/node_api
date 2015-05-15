var restify = require('restify');
var async = require('async');
var mongoose = require('mongoose');
var lib = require('../lib');

var Product = require('../models/Product');
var ProductModel = mongoose.model('Product');

var server = restify.createServer({
  name: 'node_api'
});

// Clean up sloppy paths like //todo//////1//
server.pre(restify.pre.sanitizePath());

// Handles annoying user agents (curl)
server.pre(restify.pre.userAgentConnection());

// Allow 5 requests/second by IP, and burst to 10
server.use(restify.throttle({
    burst: 10,
    rate: 5,
    ip: true,
}));


// Use the common stuff you probably want
// server.use(restify.acceptParser(server.acceptable));
// server.use(restify.dateParser());
// server.use(restify.authorizationParser());
server.use(restify.queryParser());
// server.use(restify.gzipResponse());
// server.use(restify.bodyParser());


server.get('/', function (req, res, next) {
  console.log('GET /');
  res.send('Home');
  res.end();
});

server.get('/products/:id', function get_product(req, res, next) {
  var product_id = req.params.id;

  // Get remote date via http.get, then get data from mongo
  async.waterfall([ function get_ext_data(){
    var ext_data = lib.callExternalAPI(product_id, function(){
      return cb(null, ext_data);
    });
  }, function get_db_data(external_data) {
    var db_data = ProductModel.find({product_id: product_id}, function(err, product){
      if (err) return cb(err)
      return cb(null, external_data, db_data);
    });
  }, function put_them_together(external_data, db_data) {
    return cb();
  }
    ], function andThen(err, data){
      if (err) {
        res.statusCode = 500;
        res.send('An error occurred');
      }
      res.json(data);
    });
  console.log('Product Id', product_id);
  res.send('Product Id' + product_id);
  res.end();
});
