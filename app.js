const express = require('express');
const app = express();
const parser = require('./parser');

app.use(parser());

app.post('/', (req, res) => {
  res.body = req.body;
  res.send(res.body);
});

app.put('/', (req, res) => {
  res.body = req.body;
  res.send(res.body);
});

app.use((err, req, res, next) =>{
  res.status(400).send('invalid json');
});

module.exports = app;
