const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server.js');
const bodyParser = require('../bodyparser').parse;
const Emitter = require('events');

describe('body parser unit testing', () => {

  it('works', done => {
    const request = new Emitter();
    request.emit('data');
    // bodyParser(request, response);
    
  });
  
  
  
});
