const bodyparser = require('./bodyparser');
const express = require('express');
const app = express();

// Sends instructions telling client to use a POST method request
app.get('/*', (req, res) => {
  res.send('To receive data, send JSON data with a POST request');
});

// Middleware function for Parsing the JSON body
app.use(bodyparser);

// Will responed to any url when given a POST request with valid JSON
app.post('/*', (req, res) => {
  res.json(req.body);
});

// Default response for requests other than POST or GET
app.use( (req, res) => {
  res.status(405).send('Sorry that method is not allowed. But for your trouble here is a 405 Error.');
});

// Error message
app.use( (err, req, res, next) => {
  res.beQuietLinter = next;
  res.status(err.code || 404).send(err.content || 'Error, cannot respond to request');
});

module.exports = app;
