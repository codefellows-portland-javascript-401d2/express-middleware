const bodyparser = {};

function isJson(data) {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
}


bodyparser.json = (req, res, next) => {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    if (isJson(body)) {
      req.body = JSON.parse(body);
      next();
    } else res.status(400).send('invalid JSON');
  });
};

module.exports = bodyparser;
