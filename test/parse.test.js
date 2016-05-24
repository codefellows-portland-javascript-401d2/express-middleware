const chai = require( 'chai' );
const chaiHttp = require ( 'chai-http' );
chai.use(chaiHttp);
const assert = chai.assert;
const request = chai.request;
const expect = chai.expect;
const server = require( '../index.js');
const parse = require( '../parse.js');
const Event = require( 'events');



describe ( 'Body Parser Middleware', () => {

  describe('Parsing the json object', () => {

    var data = {pet: 'dog'};

    it('data should get saved as json object to req.body', () => {

      const req = new Event;
      var res;
      parse(req, res, ()=>{});
      req.emit('data', JSON.stringify(data));
      expect(req.body).to.be.an('object');
      expect(req.body).to.eql({pet: 'dog'});
      assert.deepEqual(req.body, ({pet: 'dog'}));
    });

    it('if it\'s not JSON it should return invalid error', () => {

      const req = new Event;
      var res = {};
      res.status = function (code){
        this.code = code;
        return this;
      };
      res.send = function (msg){
        this.msg = msg;
      };
      parse(req, res, ()=>{});
      req.emit('data', data);
      // expect(error).to.equal('400 Invalid JSON');
      assert.equal(res.code, '400');
      assert.deepEqual(res.msg, {error: 'Invalid JSON'});
    });
  });

  describe('Checking the POST request', () => {
    it('should respond with {"pet": "dog"}', (done) => {
      request('localhost:8080')
        .post('/')
        .send('{"pet": "dog"}')
        .end((err,res) => {
          if (err) throw err;
          expect(res.body).to.have.a.property('pet');
          expect(res.body).to.be.an('object');
          expect(res.body).to.eql({pet: 'dog'});
          // assert.equal(res.body, ({pet: 'dog'}));

          done();
        });
    });
  });
});
