
module.exports = function(req, res, next) {
  req.on('data', (data) => {
    req.body = JSON.parse(data);
    if(!(typeof req.body === 'object')) {
      res.status(400).send({error: 'Invalid JSON'});
      res.end();
    }
    next();
  });
};
