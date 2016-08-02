![cf](http://i.imgur.com/7v5ASc8.png) express-middleware
====

located in the lib folder is bodyparser.js.  This is a middleware for Express that parses incoming data and converts it to plain text.  Currently only a JSON parser is available.

To use:
``` javascript
const bodyparser = require ('./lib/bodyparser');
app.use (bodyparser.json);
```

### tests are available:

run the following:

    npm install
    npm test
