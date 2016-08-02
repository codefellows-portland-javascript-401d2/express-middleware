const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');

describe('end to end testing', () => {
  
  var request = chai.request(server);
  var postData = {breed: 'doberman'};
  
  it('posts with a statusCode 200', done => {
    request
        .post('/dogs')
        .send(JSON.stringify(postData))
        .end((req, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
  });
  
  it('responds with code 412 when invalid JSON is posted', done => {
    var badData = '{badData}';
    request
        .post('/dogs')
        .send(badData) 
        .end((req, res) => {
          assert.equal(res.statusCode, 412);
          done();
        });
  });
  
  it('req.body is parsed', done => {
    request
        .post('/dogs')
        .send(JSON.stringify(postData))
        .end((req, res) => {
          assert.deepEqual(res.body, postData);
          done();
        });
  });
  
});