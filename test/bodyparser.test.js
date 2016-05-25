const bodyparser = require('../routes/bodyparser');
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

    // Finds the handler for the POST route with path as '/*'
    var handler = bodyparser.stack.find( e => {
      return (e.route.methods.post === true) && (e.route.path === '/*');
    })
      .route.stack[0].handle;

    handler(req, res, next);

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

    // Finds the handler for the POST route with path as '/*'
    var handler = bodyparser.stack.find( e => {
      return (e.route.methods.post === true) && (e.route.path === '/*');
    })
    .route.stack[0].handle;

    handler(req, res, next);

    req.emit('data', jsonBrokenObj);
    req.emit('end');
  });

  it('Returns a helpful message if given a GET request', done => {
    var req = new events.EventEmitter();
    var next = function () {
      assert.equal(req.body, 'To receive data, send JSON data with a POST request');
      done();
    };

    // Finds the handler for the GET route with path as '/*'
    var handler = bodyparser.stack.find( e => {
      return (e.route.methods.get === true) && (e.route.path === '/*');
    })
    .route.stack[0].handle;

    handler(req, res, next);
  });

});
