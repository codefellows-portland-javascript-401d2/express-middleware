const express = require('express');
const app = express();





app.use( (req, res) => {
  res.status(404).send('Sorry but I must give you a 404 Error.');
});


module.exports = app;
