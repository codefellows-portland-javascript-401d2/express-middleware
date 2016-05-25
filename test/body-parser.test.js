const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

describe.skip('Body Parser Unit Test', () => {
});

describe('Body Parser E2E Test', () => {
  chai.use(chaiHttp);

  const request = chai.request(app.listen(8080));
  const bodyObject = {
    key: 'value'
  };
  const bodyString = JSON.stringify(bodyObject);
  const bodyJson = JSON.parse(bodyString);

  it('GET / returns an error in JSON', (done) => {
    request
      .get('/')
      .set('Content-Type', 'application/json')
      .end((error, response) => {
        const textJson = JSON.parse(response.text);

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
      .send('{"key":"value"}')
      .end((error, response) => {
        const textJson = JSON.parse(response.text);

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
        const textJson = JSON.parse(response.text);

        expect(response).to.have.status(400);
        expect(response.text).to.be.a('string');
        expect(textJson).to.be.an('object');
        expect(textJson.status).to.equal('error');
        expect(textJson.results).to.equal('Invalid JSON');

        done();
      });
  });
});
