//send in event emitter, get next to be called
const parser = require('../parser');
const chai = require('chai');
const assert = chai.assert;


describe('parser', () => {
  it('returns a function with three arguments', (done) =>{
    var parseOutput = parser();
    assert.equal(typeof parseOutput, 'function');

    done();
  });



});
