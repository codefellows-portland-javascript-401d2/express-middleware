function bodyparser(req, res, next) {

  var jData = '';

  req.on('data', chunk => {
    jData += chunk;
  });

  req.on('end', () => {
    try {
      var parsedData = JSON.parse(jData);
    }catch(err){
      const error = { code: 404, content: 'Invalid JSON - ' + err};
      next(error);
      return;
    }

    if (parsedData){
      req.body = parsedData;
      next();
    }else{
      const error = { code: 404, content: 'Invalid JSON'};
      next(error);
    }
  });
}

module.exports = bodyparser;
