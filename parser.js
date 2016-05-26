//const express = require('express');
//const app = require('./app');

module.exports = function(){
  return function parser(req, res, next){
    var body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        var parsed = JSON.parse(body.toString());
        req.body = parsed;
        next();
      }
      catch(err){
        next(err);
      }
    });
  };
};
