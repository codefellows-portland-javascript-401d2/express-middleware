
function parser (req, res, next) {

  req.on('data', (data) => {
    try {
      req.body = JSON.parse(data);
      next();
    } catch (e) {
      res.status(400).send({error: 'Invalid JSON'});
    }


  });
};

module.exports = parser;
