const jwt = require('jsonwebtoken');
const jwtKey = require('../_secrets/keys').jwtKey;

module.exports = {
  errorHandler: function(err, req, res, next) {
    console.log(err);
    if (err.errno === 19)
      return res.json({ error: true, msg: 'Username is already taken' });
    switch (err.code) {
      case 404:
        res.json({
          error: true,
          msg: 'The requested file does not exist.',
        });
        break;
      case 400:
        res.json({
          error: true,
          msg: 'Please complete all the required fields',
        });
        break;
      case 403:
        res.json({
          error: true,
          msg: 'You are unathorized to view the content.',
        });
        break;
      default:
        res.status(500).json({
          error: true,
          message: 'There was an error performing the required operation',
        });
        break;
    }
  },
  authenticate: function(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, jwtKey, (err, decodedToken) => {
        console.log('err', err);
        if (err)
          return res.json({
            error: true,
            msg: 'Invalid Token',
          });

        console.log(decodedToken);
        req.user = { id: decodedToken.id };
        next();
      });
    } else {
      next({ code: 403 });
    }
  },
};
