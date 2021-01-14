const bcrypt = require('bcryptjs');
const express = require('express')
const router = express.Router();

const { authenticate, generateToken } = require('./../config/middlewares.js');

const db = require('../database/dbConfig.js');


//USERS REGISTER  and  LOGIN 
//======= FUNCTION TO SEE REGISTER NEW USERE '/api/register' ========
router.post('/register', (req, res) => {
    console.log("req.body  : ", req.body);
    const credentials = req.body;
     db('users')
          .where({ username : credentials.username })
          .first()
          .then(user => {
                if(user) {
                        res.status(409).json({message : "Username already exists"})
                }
                else {
                        const hash = bcrypt.hashSync(credentials.password, 6);
                        credentials.password = hash;
                        db('users').insert(credentials)
                                   .then(ids => {
                                        res.status(201).json(ids);
                                    })
                                    .catch(err => res.send(err));
                }
           })  
})

//======= FUNCTION LOGIN ========
router.post('/login', (req, res) => {
    const credentials = req.body;
    db('users')
          .where({ username : credentials.username })
          .first()
          .then(user => {
              if(user && bcrypt.compareSync(credentials.password, user.password)) {
                    const token = generateToken(user);
                    res.status(200).send({message : "Logged In", token});
              } else {
                    res.status(401).json({message : "Invalid username or password.."})
              }
           })
          .catch(err => res.send({Message : "Error in Logging In..."}));
})

module.exports = router;
