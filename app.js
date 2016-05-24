const express = require('express');
const app = express();

app.use((req, res, next) => {
  var body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      var parsed = JSON.parse(body.toString());
      req.body = parsed;
      next();
    }
    catch(err){
      next(err);
    }
  });
});

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
