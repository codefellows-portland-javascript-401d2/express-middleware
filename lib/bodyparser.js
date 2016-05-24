const bodyparser = {};

function isJson(data) {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
}


bodyparser.json = (req, res, next) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    console.log('got here');
    if (isJson(body)) {
      req.body = JSON.parse(body);
      next();
    } else res.status(400).send('invalid JSON');
  });
};

module.exports = bodyparser;
