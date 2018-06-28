const router = require('express').Router();

const User = require('../users/userModel');
const jwt = require('jsonwebtoken');
const secret = "wubba lubba dub dub"

function generateToken(user){
    const option = {
      expiresIn: '1h'
    }

    const payload = {
      name: user.username,
    }

    return jwt.sign(payload,secret,option)
}

router.post('/register', function(req, res) {
    console.log(req.body)
  User.create(req.body)
    .then(({ username}) => {
      // we destructure the username and race to avoid returning the hashed password

      // then we assemble a new object and return it
      const cc = {username: username}
      const token = generateToken(cc)
      res.status(200).json({ message: `come in ${username}`, token})
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', function(req,res){
    console.log(req.body)
  const  {username, password} = req.body;
  User.findOne({username})
    .then(user => {
      if(user){
        user.validatePassword(password)
          .then(passMatch => {
            if(passMatch){
              const token = generateToken(user)
              console.log("user", user)
              res.status(200).json({ uid: `${user._id}`, token})
            }
            else{
              res.status(401).json({ message: `inccorect password`}) 
            }
          })
          .catch(err => {
            res.status(401).json({ message: `unable to verify password ${err}`}) 
          })
      }
      else{
        res.status(401).json({ message: `usernames don't match brah`}) 
      }

    })
})
module.exports = router;
