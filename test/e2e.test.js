const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../lib/app');
// const server = require('../server');
const assert = chai.assert;

chai.use(chaihttp);

describe('End to End Test', () => {
  const request = chai.request(app.listen(8080));

  const jsonObj =  JSON.stringify({
    title: 'Lens Hacking Workshop',
    category: 'Film',
    imageMain: 'lens1.jpg'
  });

  const jsonBrokenObj = 'thisIsNotJSON';

  describe('Post', () => {

    it('With valid JSON body, returns an identical JSON object', done => {
      request
      .post('/')
      .set('Content-Type', 'application/json')
      .send(jsonObj)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(JSON.parse(res.text).title, 'Lens Hacking Workshop');
        done();
      });
    });

    it('With invalid JSON body, returns error message', done => {
      request
      .post('/')
      .set('Content-type', 'application/json')
      .send(jsonBrokenObj)
      .end((err, res) => {
        assert.equal(res.statusCode, 404);
        assert.equal(res.text.slice(0, 12), 'Invalid JSON');
        done();
      });
    });

  });

  describe('Get', () => {

    it('With any GET request, returns a helpful error message', done => {
      request
      .get('/')
      .end((err, res) => {
        assert.equal(res.text, 'To receive data, send JSON data with a POST request');
        done();
      });
    });

  });

});
