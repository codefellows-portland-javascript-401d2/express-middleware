const bodyparser = require('../routes/bodyparser');
const express = require('express');
const app = express();

app.use('/', bodyparser, (req, res, next) => {
  next();
});

app.get('/*', (req, res) => {
  // Sends alert asking for a POST method request
  res.send(req.body);
});

app.post('/*', (req, res) => {
  // Will responed to any url when given a POST request with valid JSON
  res.json(req.body);
});

// Default response
app.use( (req, res) => {
  res.status(404).send('Sorry that method is not allowed. But for your trouble here is a 405 Error.');
});

// Error message
app.use( (err, req, res, next) => {
  res.beQuietLinter = next;
  res.status(err.code || 404).send(err.content || 'Error, cannot respond to request');
});

module.exports = app;
