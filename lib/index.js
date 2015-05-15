var request = require('request');

var API_KEY = process.env.API_KEY;

var functions = {};

functions.callProductsAPI = function (product_id, callback) {
  var url = 'https://api.target.com/products/v3/'+product_id+'?fields=descriptions&id_type=TCIN&key='+API_KEY;
  request(url, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    if (!error && response.statusCode == 200) {
      var body_json = JSON.parse(body);
      var item_data = body_json.product_composite_response.items[0];
      callback(null, item_data);
    }
  });
};

functions.errorHandler = function(error, res) {
  res.statusCode = 500;
  res.send(error);
  res.end();
};

module.exports = functions;
