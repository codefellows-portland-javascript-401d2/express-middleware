const express = require('express');
const bodyParser = require('./lib/body-parser.js');
const app = express();

app.use(bodyParser.json);

app.all('/', (request, response) => {
  response
    .send({
      status: 'success',
      results: request.body
    });
});

app.use((error, request, response, next) => {
  response
    .status(error.statusCode)
    .send({
      status: 'error',
      results: error.message
    });
});

module.exports = app;
