var restify = require('restify');
var async = require('async');
var lib = require('../lib');

var Product = require('../models/Product');
var ProductModel = mongoose.model('Product');

var server = restify.createServer();

server.get('/products/:id', function(req, res){
  var product_id = req.params.id;

  // Get remote date via http.get, then get data from mongo
  async.waterfall([ function get_ext_data(){
    var ext_data = lib.callExternalAPI(product_id, function(){
      return cb(null, ext_data);
    });
  }, function get_db_data(external_data) {
    var db_data = ProductModel.find({product_id: product_id}, function(err, product){
      if (err) return cb(err)
      return
    });
  }, function put_them_together(external_data, db_data) {

  }
    ], function andThen(err, data){
      if (err) {
        res.statusCode = 500;
        res.send('An error occurred');
      }
      res.json(data);
    });
});

module.exports = server;