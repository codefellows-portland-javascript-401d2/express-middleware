const chai = require('chai');
const chaiHttp = require('chai-http');
const EventEmitter = require('events');
const bodyParser = require('../lib/body-parser');
const app = require('../app');
const expect = chai.expect;

describe('Body Parser Unit Test', () => {
  it('Should set request.body with JSON', (done) => {
    let request = new EventEmitter();
    let nextCalled = false;
    let next = () => nextCalled = true;

    request.is = () => true;

    bodyParser.json(request, null, next);

    request.emit('data', '{"key": "value"}');
    request.emit('end');

    expect(request.body).to.be.an('object');
    expect(request.body).to.have.property('key', 'value');
    expect(nextCalled).to.be.true;

    done();
  });

  it('Should fail because content-type isn\'t set to JSON', (done) => {
    let request = new EventEmitter();
    let nextCalled = false;
    let next = () => nextCalled = true;

    request.is = () => false;

    bodyParser.json(request, null, next);

    expect(request.body).to.be.an('undefined');
    expect(nextCalled).to.be.true;

    done();
  });

  it('Should fail because no JSON passed in body', (done) => {
    let request = new EventEmitter();
    let nextCalled = false;
    let next = () => nextCalled = true;

    request.is = () => true;

    bodyParser.json(request, null, next);

    request.emit('data', '');
    request.emit('end');

    expect(request.body).to.be.an('undefined');
    expect(nextCalled).to.be.true;

    done();
  });
});

describe('Body Parser E2E Test', () => {
  chai.use(chaiHttp);

  let request = chai.request(app);
  let bodyObject = {
    key: 'value'
  };
  let bodyString = JSON.stringify(bodyObject);
  let bodyJson = JSON.parse(bodyString);

  it('GET / returns error in JSON', (done) => {
    request
      .get('/')
      .set('Content-Type', 'application/json')
      .end((error, response) => {
        expect(error).to.not.be.null;

        let textJson = JSON.parse(response.text);
        expect(response).to.have.status(400);
        expect(response.text).to.be.a('string');
        expect(textJson).to.be.an('object');
        expect(textJson.status).to.equal('error');
        expect(textJson.results).to.equal('Invalid JSON');

        done();
      });
  });

  it('POST / returns success in JSON', (done) => {
    request
      .post('/')
      .set('Content-Type', 'application/json')
      .send(bodyString)
      .end((error, response) => {
        expect(error).to.be.null;

        expect(response).to.have.status(200);
        expect(response.text).to.be.a('string');
        expect(response.body).to.be.an('object');
        expect(response.body.status).to.equal('success');
        expect(response.body.results).to.deep.equal(bodyJson);

        done();
      });
  });

  it('POST / returns error in JSON because headers not set to JSON', (done) => {
    request
      .post('/')
      .send(bodyString)
      .end((error, response) => {
        expect(error).to.not.be.null;

        let textJson = JSON.parse(response.text);
        expect(response).to.have.status(400);
        expect(response.text).to.be.a('string');
        expect(textJson).to.be.an('object');
        expect(textJson.status).to.equal('error');
        expect(textJson.results).to.equal('Invalid JSON');

        done();
      });
  });

  it('POST / returns error in JSON because body isn\'t a valid JSON format in string', (done) => {
    request
      .post('/')
      .set('Content-Type', 'application/json')
      .send('{fdasfdas}')
      .end((error, response) => {
        expect(error).to.not.be.null;

        let textJson = JSON.parse(response.text);
        expect(response).to.have.status(400);
        expect(response.text).to.be.a('string');
        expect(textJson).to.be.an('object');
        expect(textJson.status).to.equal('error');
        expect(textJson.results).to.equal('Invalid JSON');

        done();
      });
  });
});
