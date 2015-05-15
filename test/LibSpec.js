var chai = require('chai')
  , assert = chai.assert
  , expect = chai.expect
  , should = chai.should();
var lib = require('../lib/index');

describe('Library Functions', function(){
  this.timeout(5000);

  describe('#callProductsAPI', function(){
    it('should return an object', function(done){
      lib.callProductsAPI('13860428', function(err, data){
        if (err) done(err);
        data.should.be.an('object');
        done();
      });
    });
    it('should have property of online_description', function(){
      lib.callProductsAPI('1', function(err, data){
        if (err) done(err);
        expect(data).to.have.any.keys('online_description');
        done();
      });
    });

  });
});