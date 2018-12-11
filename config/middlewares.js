const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys').jwtKey;

// quickly see what this file exports
module.exports = {
    authenticate, 
    generateToken
};

//generateToken for loggedIn USER...
function generateToken(user) {
    const jwtPayload = {
        ...user,
    };
    //const jwtSecret = process.env.JWT_SECRET;

    const jwtOptions = {
        expiresIn : '1h',
    };

    return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}

//authenticate Function TO CHECK LOGGED-IN USER...
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}
