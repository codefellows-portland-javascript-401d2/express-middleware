const chai = require( 'chai' );
const chaiHttp = require ( 'chai-http' );
chai.use(chaiHttp);
const assert = chai.assert;
const request = chai.request;
const expect = chai.expect;
const server = require( '../index.js');

var req;
var error;

describe ( 'Body Parser Middleware', () => {

  describe('Parsing the json object', () => {

    it('data should get saved as json object to req.body', () => {
      req = {body: '', data: '{"pet": "dog"}'};
      function parse(obj){
        obj.body = JSON.parse(obj.data);
        if(!(typeof req.body === 'object')) {
          error = '400 Invalid JSON';
        }
      }
      parse(req);
      expect(req.body).to.be.an('object');
      expect(req.body).to.eql({pet: 'dog'});
      // assert.equal(req.body, ({pet: 'dog'}));
    });

    it('if it\'s not JSON it should return invalid error', () => {
      req = {body: '', data: '{"pet": "dog"}'};
      function parse(obj){
        obj.body = obj.data;
        if(!(typeof req.body === 'object')) {
          error = '400 Invalid JSON';
        }
      }
      parse(req);
      // expect(error).to.equal('400 Invalid JSON');
      assert.equal(error, '400 Invalid JSON');
    });

  });



});
