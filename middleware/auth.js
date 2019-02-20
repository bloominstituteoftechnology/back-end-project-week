const fs = require('fs'),
  jwt = require('jsonwebtoken');


const privateKey = fs.readFileSync(__dirname + '/../../rsa/private.key', 'utf8');
const publicKey = fs.readFileSync(__dirname + '/../../rsa/public.key', 'utf8');

module.exports = {
  generateJwt: function (req, res, next) {
    const { user_name, email } = req.body;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const payload = {
      user_name,
      email,
      ip
    };

    const signOptions = {
      expiresIn: "12h",
      algorithm: "RS256"
    };

    req.token = jwt.sign(payload, privateKey, signOptions);

    next();
  },
  validateJwt: function (req, res, next) {
    const verifyOptions = {
      expiresIn: "12h",
      algorithm: ["RS256"]
    };

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (req.cookies.token) {
      jwt.verify(req.cookies.token, publicKey, verifyOptions, function (err, decoded) {
        if (err) {
          console.log('Failed to authenticate token.');
          return res.status(403).json({ error: 'Failed to authenticate token.' });
        } else if (decoded && decoded.ip !== ip) {
          console.log('User is attempting to use token from a different computer.');
          return res.status(403).json({ error: 'Failed to authenticate token.' });
        } else {
          console.log('Token decoded: ', decoded);
          req.decoded = decoded;
        }
      });
    } else {
      console.log('No cookie found.');
      return res.status(403).send({
        error: 'No token provided.'
      });
    }

    next();
  }
};