const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../app');
const assert = chai.assert;
chai.use(chaihttp);
const request = chai.request(app);



function getJsonData() {
  return JSON.stringify(
    {
      test: 'data',
      number: 17
    });
}

describe ('bodyparser e2e', () => {
  describe ('JSON', () => {
    it ('POST with JSON data returned', () => {
      request
        .post('/test')
        .send(getJsonData())
        .end( (err, data) => {
          let result = JSON.parse(data);
          if (err) assert.fail;
          assert.isObject(result);
          assert.property(result, 'number');
        });
    });

    it('Tosses an error on bad JSON data', () => {
      request
        .post('/test')
        .send('This is most assuredly not JSON data')
        .end( (err, result) => {
          if (err) assert.fail;
          assert.equal(result, 'invalid JSON');
        });
    });

  });
});
