const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

module.exports = {
  generateToken: function(user) {
    const payload = {
      username: user.username,
      id: user.id
    };
    const options = {
      expiresIn: '1hr',
      jwtid: '1234'
    };
    return jwt.sign(payload, SECRET, options);
  },//end generate token
  protected: function(req, res, next) {
    const token = req.headers.authorization;
    if(token){
      jwt.verify(token.SECRET, (err, decodedToken) =. {
        if(err){
          res.status(401).json({ message: 'Invalid Token' });
        }else{
          req.user = {
            id: decodedToken.id,
            username: decodedToken.username
          }
          next();
        }
      });
    }else{
      res.status(401).json({message: 'No token present' });
    }
  }, //end of protected middleware
}
