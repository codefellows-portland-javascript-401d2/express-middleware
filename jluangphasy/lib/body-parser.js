const bodyParser = {};

bodyParser._invalidJson = {
  statusCode: 400,
  message: 'Invalid JSON'
};

bodyParser.json = (request, response, next) => {
  if (request.is('json')) {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      try {
        request.body = JSON.parse(body);
        next();
      } catch (error) {
        next(bodyParser._invalidJson);
      }
    });
  } else {
    next(bodyParser._invalidJson);
  }
};

module.exports = bodyParser;
