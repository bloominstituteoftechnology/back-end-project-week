const jwt = require('jsonwebtoken');
const User = require('./usersModel.js');
const { secret } = require('./makeTokenMWR.js');



const authenticate = (req, res, next) => {

  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {

      if (err) {
        return res.status(422).json({ msg: err })
      }
      req.decoded = decoded;
      next()
    })
  }

  else {
    return res.status(403).json({ msg: 'sorry there is not token, you can not pass' })
  }
}
module.exports = authenticate;