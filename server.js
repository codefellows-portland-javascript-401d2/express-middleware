const bodyParser = require('./bodyparser').parse;
// const isJSON = require('./bodyparser').isJSON;
var app = require('express')();

app.use(bodyParser);

app.get('/', (req, res) => {
  res.send({Welcome: 'index page'});
});

app.post('/dogs', (req, res) => {
  res.send(req.body);
});

app.use((err, req, res, next) => {
  res.status(err.code);
  res.send(err.error);
});


module.exports = app;