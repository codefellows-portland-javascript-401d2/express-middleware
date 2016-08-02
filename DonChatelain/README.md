![cf](http://i.imgur.com/7v5ASc8.png) express-middleware
====

## Usage:
```
const bodyParser = require('bodyparser).parse;
const app = require('express')();

app.post('/your/path', bodyParser, (req, res) => {
  res.send(req.body);
});
```
The *bodyParser* module alongside Express.js acts as middleware
that parses JSON into the *request.body* property and calls next() to any subsequent routers. 

If the incoming JSON
is not valid JSON, the bodyParser module will call next() with an error 
object with *code* and *error* properties.

To properly catch the invalid json error object, you must write something like this:

```
app.use((err, req, res, next) => {
  res.status(err.code);
  res.send(err.error);
});
```



---
Lab assignment instructions are located [here](LAB.md)

