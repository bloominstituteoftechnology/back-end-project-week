const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const server = express();
const noteRouter = require('./notes/noteRouter.js');
const userRouter = require('./users/userRouter.js');
const User = require('./users/User.js');
const secret = process.env.secret;
const corsOptions = {
  origin: 'https://afternoon-bayou-71588.herokuapp.com',
  credentials:true
};
server.use(cors(corsOptions));
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
      res.status(400).json({error:"Invalid username / password"});
      return;
    }
    if(user.comparePassword(password)){
      res.status(200).json({token:jwt.sign({username:user.username,_id:user._id},'RESTFULAPIs')});
    }
    else{
      res.status(400).json({error:"Invalid username / password"});
    }
  });
};
const authCheck = function(req,res,next){
  if(req.user){
    next();
  }
  else{
    return res.status(401).json({message:"Unauthorized user!"});
  }
};
const createUser = (req,res)=>{
  const newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password,10);
  newUser
  .save()
  .then(user=>{
    user.password = undefined;
    res.status(200).json(user);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
};
server.use(express.json());
server.use(function(req,res,next){
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
    jwt.verify(req.headers.authorization.split(' ')[1],'RESTFULAPIs', function(err, decode) {
      if(err) {
        req.user = undefined;
      }
      req.user = decode;
      next();
    });
  }else{
      req.user = undefined;
      next();
    }
  });


server.use('/api/note', authCheck, noteRouter);
server.use('/api/user', authCheck,userRouter);
server.get('/', (req,res) => {
  res.status(200).json({api:'running'});
});
server.post('/api/login', login);
server.post('/api/register',createUser);

const port = process.env.PORT || 5000;
server.listen(port, ()=>console.log(`\n=== API up on port: ${port} ===\n`));
