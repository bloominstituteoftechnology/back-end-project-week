const jwt = require('jsonwebtoken');
const uuid = require('uuid/v1');
const database = require('../helpers/userModel');


require('dotenv').config();

const JWTKey = process.env.JWT_SECRET || 'we are what we think';

function newToken(user) {
    const payload = {email: user.email};
    const options = {algorithm: 'HS256', expiresIn: '1h', jwtid: uuid()};    
    return jwt.sign(payload, JWTKey, options);
};

function protected(req,res,next) {
   const token = req.headers.authorization;
   console.log(token);
   if(token) {
         jwt.verify(token, JWTKey, (err,decodedToken) => {
            console.log(`jwt protected`,decodedToken);
         if(err) {
            res.status(403).json({msg:`You cannot pass!! not decoded`});
         }
         // req.email = decodedToken.email;
         // console.log(`From protected middleware`, decodedToken``);
         next();
      });
      } else {
         res.status(403).json({msg:`No token provided, so you cannot pass`});
     } 
};

const checkUser = (req,res,next) => {
   const user = req.body
   if(!user.email) res.status(400).json({Message:`email is required`});
   if(!user.password) res.status(400).json({Message: `Password is required`});
   if(user.password.length<6) res.status(400).json({Message:`Password must be at least 7 characters`});
   database.findByEmail(user.email)
           .then( dbUser => {
              if(dbUser) {
                 res.status(401).json({msg:`user ${dbUser.email} already Registered`})
              }
           })
           .catch(err => {
                 res.status(500).json({msg:`Something went wrong`});
           });
           next();
};

const checkLogin = (req,res,next) => {
      const user = req.body;
      if(!user.email) res.status(400).json({Message:`email is required`});
      if(!user.password) res.status(400).json({Message: `Password is required`});
      if(user.password.length<6) res.status(400).json({Message:`Password must be at lease 7 characters`});
      next();
}

module.exports = {
   newToken, 
   protected,
   checkUser,
   checkLogin
} 