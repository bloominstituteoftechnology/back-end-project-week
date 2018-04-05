const jwt = require('jsonwebtoken');

const User = require('../models/userModels');
const { mysecret } = require('../../config');

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      req.username = decoded.username;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

// const hashPassword = (req, res, next) => {
// 	const { 
// 		password
// 	} = req.body;

// 	if (!password) {
// 		sendUserError('You need to enter password', res);
// 		return;
// 	} else {
// 		bcrypt.hash(password, BCRYPT_COST, (err, hash) => {
// 			if (err) console.error(err);
// 			if (hash) {
// 				user = {
//           username,
//           password: hash
//         };
//         req.user = user;
// 				next();
// 			}
// 		});
// 	}
// };

module.exports = {
  authenticate,
  // hashPassword
};