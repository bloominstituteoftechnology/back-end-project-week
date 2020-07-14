const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_SEC

const auth = (req, res, next) => {
 const token = req.headers.authorization;
 if (token) {
  jwt.verify(token, jwtKey, (err, decoded) => {
   if (err) {
    res
     .status(401)
     .json(err)
   }
   else {
    req.decoded = decoded
    next()
   }
  })
 }
 else {
  res
   .status(401)
   .json({error: 'Token not provided', resolve: {
    attempt_to: "Set token to authorization header."
   }})
 }
}

module.exports = auth 