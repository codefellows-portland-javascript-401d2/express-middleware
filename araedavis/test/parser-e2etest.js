const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

var testData = {name: 'Skeeve Holt!', number: 49, position: 'blocker', captain: true };

describe('parser middleware', () => {
  var request = chai.request(app);

  it('parses and returns a json object', (done) =>{
    request
      .post('/')
      .send(testData)
      .end((res) => {
        assert.equal(res.body, testData);
      });
    done();
  });

  it('if invalid JSON returns err', (done) =>{
    request
      .post('/')
      .send(0)
      .end((res) => {
        assert.equal(res.status, 400);
      });
    done();
  });

});
