var mongoose =  require('mongoose');

// {
//  "id":13860428,
//  "name":"The Big Lebowski (Blu-ray) (Widescreen)",
//  "current_price": {
//      "value": 13.49,
//      "currency_code":"USD"
//   }
// }
var schema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  current_price: {
    value: {
      type: Number,
      required: true
    },
    currency_code: {
      type: String,
      default: 'USD'
    }
  }
});

var Product = mongoose.model('Product', schema);