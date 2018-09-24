const express = require('express');
const db = require('../data/helpers/users');
const bcrypt = require('bcryptjs');
const jwt = require('../jwtConfig');

const router = express.Router();

//create a new user
router.post('/register', async (req,res) => {
  let { username, password, email } = req.body;
  if(!username || !password || !email){
    res.status(422).json({message: 'An email, username, and password is required' });
  }else{
    password = bcrypt.hashSync(password, 16);
    try{
      let userID = await db.add({username, password, email});
      let user = await db.get(userID[0]);
      const token = jwt.generateToken({ id: user.id, username: user.username });
      res.status(201).json({ id: user.id, username: user.username, token });
    }catch(e) {
      res.status(500).json(e);
    }
  }
});

//login a user
router.post('/login', (req, res) => {

});

module.exports = router;
