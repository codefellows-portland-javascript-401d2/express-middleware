const bodyparser = require('../lib/bodyparser');
const chai = require('chai');
const events = require('events');
const assert = chai.assert;

const jsonObj =  JSON.stringify({
  title: 'Lens Hacking Workshop',
  category: 'Film',
  imageMain: 'lens1.jpg'
});
const jsonBrokenObj = 'thisIsNotJSON';
const res = {};

describe('Bodyparser Module Test', () => {

  it('Calls next on success and adds an object to req.body when given a JSON', done => {
    var req = new events.EventEmitter();
    var next = function () {
      assert.equal(req.body.title, 'Lens Hacking Workshop');
      done();
    };

    bodyparser(req, res, next);

    req.emit('data', jsonObj);
    req.emit('end');
  });

  it('Returns an error when given an invalid JSON', done => {
    var req = new events.EventEmitter();
    var next = function (err) {
      assert.equal(err.code, 404);
      assert.equal(err.content.slice(0, 12), 'Invalid JSON');
      done();
    };

    bodyparser(req, res, next);

    req.emit('data', jsonBrokenObj);
    req.emit('end');
  });

});
