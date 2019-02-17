const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../helpers/userModel.js');
const {protected, newToken, checkUser, checkLogin} = require('../middleware/user_middleware');

router.post('/api/register',checkUser, (req,res) => {
      const user = req.body;
      var hash = bcrypt.hashSync(user.password,10);
      user.password = hash;
      db.insert(user)
        .then( ids => {
          const id = ids[0];
          db.getById(id)
            .then( user => {
                const token = newToken(user);
                res.status(201).json({token:token, id:user.id});
            })
            .catch(err => {
                res.status(500).json({Msg:`Unable to add new user...already registered??`});
            });
        })
       
});

router.post('/api/login', checkLogin, (req,res) => {
      const user = req.body;
      const submittedPassword = user.password;
      db.findByUsername(user.username)
        .then( user => {
            if(!user) res.status(401).json({Message:`There is no user with ${user.username}`});
            if(user && bcrypt.compareSync(submittedPassword, user.password)) {
                 const token = newToken(user);
                 res.status(200).json({token:token,id:user.id})
            } else {
                 res.status(401).json({Msg:`Invalid user or Invalid password`});
            }          
        })
        .catch(err => {
                res.status(500).json({Message:`Failed to login at this time`});
        })
});

module.exports = router;