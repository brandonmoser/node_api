var db = require('../lib/Db');
var mongoose = require('mongoose');
var Product = require('../models/Product');
var ProductModel = mongoose.model('Product');

var seeds = require('./seeds');

for (var i = 0; i < seeds.length; i++) {
  ProductModel.create(seeds[i], function(err){
    if (err) throw err;
    mongoose.disconnect();
  })
}

