require('dotenv').config();
const express = require('express');
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');

const db      = require('../data/dbConfig.js');

const parser = express.json();
const router = express.Router();

router.use(parser);

//endpoint

generateToken = (user)=>{
  const payload ={
    username: user.username,
    role: user.role
  }
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn:'10m'
  }
  return jwt.sign(payload,secret,options);
}

router.post('/register', (req, res)=>{
  const user = req.body;
  user.password =bcrypt.hashSync(user.password, 10);
  db('users')
  .insert(user)
  .then( id =>{
    res.status(201)
    .json({msg:"user successfully created"})
  })
  .catch(err => {
    res.status(500).send(err);
  });
})

router.post('/login',(req, res)=>{
  const creds = req.body;
  db('users').where('username', creds.username).first()
  .then(user => {
    if(user && bcrypt.compareSync(creds.password, user.password)){
      const token = generateToken(user);
      res.status(202).json({msg:"user logged in", token});
    }
    else{
      res.status(401).json({msg:"invalid username or password"})
    }
  })
  .catch(err =>{
    res.status(500).json({msg:"server encountered issues"})
  })
})


module.exports = router;