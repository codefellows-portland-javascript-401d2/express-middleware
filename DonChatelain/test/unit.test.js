const assert = require('chai').assert;
const bodyParser = require('../bodyparser').parse;
const Emitter = require('events');

describe('body parser unit testing', () => {
  
  it('works with valid JSON', done => {
    var validData = {breed: 'doberman'};
    var nextCalled = false;
    var next = function() {
      nextCalled = true;
    };
    const request = new Emitter();
    bodyParser(request, null, next);
    request.emit('data', JSON.stringify(validData));
    request.emit('end');
    assert.equal(nextCalled, true);
    done();
  });
  
  it('passes error code and message with INVALID JSON', done => {
    var badData = '{breed: "pitbull}';
    var error;
    var next = (err) => {
      error = err;
    };
    
    const request = new Emitter();
    bodyParser(request, null, next);
    request.emit('data', badData);
    request.emit('end');
    assert.equal(error.code, 412);
    assert.equal(error.error, 'Invalid JSON');
    done();
    
  });
  
  
  
});
