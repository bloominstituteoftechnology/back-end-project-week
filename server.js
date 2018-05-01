const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const server = express();
const noteRouter = require('./notes/noteRouter.js');
const userRouter = require('./users/userRouter.js');
const User = require('./users/User.js');
const secret = process.env.secret;
mongoose.connect(process.env.URI);
let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open', ()=>{
  console.log('open');
});
const getTokenForUser = userObject => {
  return jwt.sign(userObject,secret,{expiresIn:'1h'});
};
const login = (req,res) => {
  const {username, password} = req.body;
  User.findOne({username}, (err, user)=>{
    if(err || user === null){
      res.status(500).json({error:"Invalid username / password"});
      return;
    }
    if(user.password === password){
      const token = getTokenForUser({username: user.username});
      res.status(200).json({token});
    }
    else{
      res.status(500).send('failure');
    }
  });
};
server.use(express.json());
server.use('/api/note', noteRouter);
server.use('/api/user', userRouter);
server.get('/', (req,res) => {
  res.status(200).json({api:'running'});
});
server.post('/api/login', login);

const port = process.env.PORT || 5000;
server.listen(port, ()=>console.log(`\n=== API up on port: ${port} ===\n`));
