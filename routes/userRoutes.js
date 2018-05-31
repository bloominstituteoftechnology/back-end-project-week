const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../src/users/User');
const Note = require('../src/notes/Note');

let secret;

if (!process.env.SECRET) {
  secret = require('../config/config').stringSecret;
} else {
  secret = process.env.SECRET;
}


const getTokenForUser = userObject => {
  return jwt.sign(userObject, secret, { expiresIn: '1h' });
};


const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(422)
      .json({ error: 'No authorization token found on Authorization header' });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ error: 'Token invalid, please login', message: err });
      } else {
        next();
      }
    });
  }
};


router.route('/')
  .get((req, res) => {
    res.status(200).json({message: "if you see this, it works"})
  });
  
  
router.route('/register')
  .post((req, res) => {
    const newUser = req.body;
    
    User.create(newUser)
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(err => res.send({ error: err }));
  });
  
router.route('/login')
  .post((req, res) => {
    const { username, password } = req.body;
    
    User.findOne({ username }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Invalid username or password "});
      }
      
      if(!user) {
        return res.status(422).json({ error: "No user with such name in DB" });
      }
      
      user.checkPassword(password, (err, matched) => {
        if(err) {
          return res.status(422).json({ error: 'passwords do not match' });
        }
        
        if(matched) {
          const token = getTokenForUser({ username: user.username });
          res.json({ token });
        } else {
          return res.status(422).json({ error: 'passwords or smth is wrong' });
        }
      });    
    });
  });
  
  
router.route('/all')
  .get(validateToken, (req, res) => {
    User.find({})
      .then(users => {
        if (!users) {
          res.status(422).json({ error: "No users found"})
        } else {
          res.status(200).json(users)
        }
      })
      .catch(err => res.send({ error: err }));
  });


module.exports = router;