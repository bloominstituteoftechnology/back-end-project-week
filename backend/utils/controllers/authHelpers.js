require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

const generateToken = user => {
  const payload = {
    _id: user._id,
    email: user.email
  };
  const options = {
    expiresIn: '1h'
  };
  // Returning signed token
  return jwt.sign(payload, SECRET, options);
};

const verifyToken = token => {
  return jwt.verify(token, SECRET, function(err, decodedToken) {
    if (err) {
      console.log("@verifyToken - Error:",err);
      return false;
    }
    return decodedToken;
  });
};

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log('checkAuth token:',token);
  const isTokenValid = verifyToken(token);
  // ***
  if (token && isTokenValid) {
    req.plainToken = isTokenValid;
    next();
  } else {
    res.status(401).json({ "error": "401 Unauthorized\nAuthentication token is missing or invalid." });
  }
};

module.exports = {
  checkAuth,
  generateToken,
  verifyToken
}