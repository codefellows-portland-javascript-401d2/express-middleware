const assert = require('chai').assert;
const bp = require ('../lib/bodyparser');
const Event = require('events');

function getJsonData() {
  return JSON.stringify(
    {
      test: 'data',
      number: 17
    });
}

function getMockRes() {
  return {
    send(s) { this.out = s; },
    status(c) {
      this.code = c;
      return this;
    }
  };
}

describe ('bodyparser unit', () => {
  describe ('JSON', () => {
    it ('reads data and parses it', () => {
      const req = new Event;
      const res = getMockRes();

      bp.json(req, res, ()=>{});
      req.emit('data', getJsonData());
      req.emit('end');
      assert.deepEqual(JSON.stringify(req.body), getJsonData());
    });

    it('Tosses an error on bad JSON data', () => {
      const req = new Event;
      const res = getMockRes();

      bp.json(req, res, ()=>{});
      req.emit('data', 'This is false data');
      req.emit('end');
      assert.propertyVal(res, 'out', 'invalid JSON');

    });

  });
});
