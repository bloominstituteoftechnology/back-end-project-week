const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET

const authenticate = (req, res, next) =>{
  const token = req.headers.authorization
  if(token){
    jwt.verify(token, secret,(err, decodedToken) =>{
      if(err){
        res.status(401).json({msg:"invalid token"})
      }
      else{
        req.decodedToken = decodedToken;
        next();
      }
    })
  }
  else{
    res.status(401).json({msg:"invalid token"})
  }
}

module.exports ={
  authenticate,
}