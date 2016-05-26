const express = require('express');
const app = module.exports = express();
const bp = require ('./lib/bodyparser');

app.use(bp.json);

app.post('/test', (req, res) => {
  res.send(req.body);
});
