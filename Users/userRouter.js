const router = require('express').Router();

const User = require('./user');


// add endpoints here

router
.post('/register',(req,res)=>{
    const { username, password } = req.body;
    const user = new User({ username, password });
  
    user.save((err, user) => {
      if (err) return res.send(err);
  
      const token = getToken({ username: user.username });
      res.json({ token });
    });
})
router
.post('/login',(req,res)=>{
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Invalid Username/Password' });
      }
  
      if (!user) {
        return res
          .status(422)
          .json({ error: 'No user with that username in our DB' });
      }
  
      user.checkPassword(password, (err, isMatch) => {
        if (err) {
          return res.status(422).json({ error: 'passwords dont match' });
        }
  
        if (isMatch) {
          const token = getTokenForUser({ username: user.username });
          res.json({ token });
        } else {
          return res.status(422).json({ error: 'passwords dont match' });
        }
      });
    });
})
module.exports = router;
