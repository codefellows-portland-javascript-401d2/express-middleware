var bodyParser = {};

bodyParser.parse = function(req, res, next) {
  var body = '';
  req.on('data', chunk => {
    body += chunk;
  }); 
  req.on('end', (err) => {
    if (err) return callback(err);
    if (bodyParser.isJSON(body)) {
      req.body = JSON.parse(body);
      next();
    } else {
      next({
        code: 412,
        error: 'Invalid JSON'
      });
    }
  });
};
  
bodyParser.isJSON = function(input) {
  try {
    JSON.parse(input);
    return true;
  } 
  catch(e) {
    return false;  
  }
};

module.exports = bodyParser;