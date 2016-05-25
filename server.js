const bodyParser = require('./bodyparser').parse;
var app = require('express')();

// app.use(bodyParser);

app.post('/dogs', bodyParser, (req, res) => {
  res.send(req.body);
});

app.use((err, req, res, next) => {
  res.status(err.code);
  res.send(err.error);
});

module.exports = app;