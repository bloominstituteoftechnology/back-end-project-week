const jwt = require('jsonwebtoken');
const uuid = require('uuid/v1');
require('dotenv').config();

const JWTKey = process.env.JWT_SECRET || 'we are what we think';

function newToken(user) {
    const payload = {username: user.username};
    const options = {algorithm: 'HS256', expiresIn: '1h', jwtid: uuid()};    
    return jwt.sign(payload, JWTKey, options);
};

function protected(req,res,next) {
   const token = req.headers.authorization;
   if(!token) res.status(401).json({msg:`No token provided`});
   jwt.verify(token, JWTKey, (err,decodedToken) => {
      if(err) res.status(401).json({msg:`Invalid token`});
      req.username = decodedToken.username;
      next();
   });
};

module.exports = {
   newToken, protected
}