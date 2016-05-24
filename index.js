const express = require( 'express' );
const app = express();
var parse = require( './parse.js');

app.use(parse);

app.post('/', (req, res) => {
  res.json(req.body);
  res.end();
});

app.listen(8080, () => {
  console.log('Server opened on port 8080!');
});
