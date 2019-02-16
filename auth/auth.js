const jwt = require("jsonwebtoken");

const key = process.env.JWT_SECRET || "add key to .env file"

//auth function
function auth(req, res, next) {
   const token = req.get("Authorization");

   //if token is present verify it
   if(token){
      jwt.verify(token, key, (err, decoded) => {
         if(err) {
            return res.status(401).json(err);
         } else {
            req.decoded = decoded;
            next();
         }
      })
   } else {
      return res.status(401).json({err: "Access Denied: Invalid Token"})
   }
}

//create token
function generateToken(user) {
   //create payload
   const payload = {
      username: user.username
   };

   //set options for jwt
   const options = {
      expiresIn: "6hrs",
      jwtid: "476"
   }

   //return new token
   return jwt.sign(payload, key, options);
};

//provide access for new functions
module.exports = {
   auth,
   generateToken
}