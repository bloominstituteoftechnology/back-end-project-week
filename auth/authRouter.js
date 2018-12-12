const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../data/config.js');

const { authenticate, generateToken } = require('./middlewares');



// ENDPOINT for each features

// login
router.post("/login", login);

// register a new user
router.post("/register", register);



function login(req, res, next) {
  // implement user login

  const cred = req.body;
  db('users')
  .where({username : cred.username})
  .first()
  .then( user => {
    if(user && bcrypt.compareSync(cred.password, user.password)){
      const token = generateToken(user);
      res.status(200).json(token);
    }else
      res.status(401).json({message:"Wrong username/password"})
    })
  .catch( () => res.status(500).json({message:"Login Failed!"}))

}

function register(req, res, next) {
  // implement user registration
  const newUser = {...req.body};
  newUser.password = bcrypt.hashSync(newUser.password, 3);
console.log('Register func  newUser = ', newUser);

  db('users')
  .insert(newUser)
  .then( ()=> login(req, res))
  .catch(() => res.status(500).json({message:"Register Failed!"}))  

}






module.exports = router;
