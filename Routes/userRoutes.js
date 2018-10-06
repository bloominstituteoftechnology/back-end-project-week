const express = require('express');
const router = express.Router();
const db = require('../data/helpers/userDb');
const passport = require('passport');
const util = require('util');
const GoogleStrategy = require('passport-google-oauth20');
//const GoogleStrategy = require('passport-google').Strategy;
const passportSetup = require('../config/passport-setup');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET;
require('dotenv').load();



function generateToken(user) {
  const payload = {
          sub: user.id,
  };

  const options = {
    expiresIn: '2h',
    jwtid: 'u9748729178yktu654',
    issuer: 'lambdastudent',
  };

  return jwt.sign(payload, jwtKey, options);
}


router.get('/', (req, res) => {

	res.status(200).send('Hello');

});


router.post('/register', (req, res)=> {

        if(!req.body.username || !req.body.password){
        res.status(400).json({error: 'Missing username or password. Provide all the details'});
        }

        else{
        const user = req.body;
        const hash = bcrypt.hashSync(user.password, 14);  //hasing password using bcrypt
        user.password = hash;


        db.add(user)
	.then(response =>{

                const token = generateToken(user);

                res.status(200).send(token);
        })
        

        .catch(err =>{
        if(err.message.includes('UNIQUE constraint failed: users.username')) {
		res.status(500).json({erro:"username already taken, use another username"});  //checking if the username is alread taken
	}
        else {
		res.status(500).json({error: "Failed to register"});
        }
	})

        }
});

router.post('/login',(req, res) => {
  const user = req.body;
	console.log(user.username);

 	 db.getUserByName(user.username)
	 .then(response =>{
		const match = bcrypt.compareSync(user.password, response.password);

		if (match) {

        		const token = generateToken(user);
			res.status(200).send(token);
      		} 

		else {
        		res.status(401).json({ error: 'Incorrect credentials' });
      		}
    	})
    	.catch(error => {
      		res.status(500).json({ error:"Failed to login" });
    })
});


router.get('/google', passport.authenticate('google',{
	scope:['profile']


}))









router.get('/logout', (req, res)=>{
        if(req.headers.authorization){
        req.headers.authorization =null;
        res.send('logged out successfully');
        }
        else {
        res.send('not logged in');
      }
    });


module.exports = router;
