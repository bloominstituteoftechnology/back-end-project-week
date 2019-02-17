const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../helpers/userModel.js');
const {protected, newToken, checkUser} = require('../middleware/user_middleware');

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
        .catch(err => {
              res.status(500).jsaon({Message: `Check..if you have already registered`});
        })
});

module.exports = router;