const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const db = require('../dbConfig');
const {protected, newToken} = require('../middleware/user_middleware');

router.post('/api/register', (req,res) => {
      const user = req.body;
      if(!user.username) res.status(400).json({Message:`username is required`});
      if(!user.password) res.status(400).json({Message: `Password is required`});
      var hash = bcrypt.hashSync(user.password,10);
      user.password = hash;
      
      db.insert(user)
        .then( ids => {
          const id = ids[0];
          db.getById(id)
            .then( user => {
                if(!user) res.status(404).json({Msg:`There is no user with the ID ${id}`});
                const token = newToken(user);
                res.status(201).json({token:token, id:user.id});
            })
            .catch(err => {
                res.status(500).json({Msg:`Sorry..you are not registered at this time`});
            })
        });
});