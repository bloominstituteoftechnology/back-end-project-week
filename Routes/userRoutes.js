const express = require('express');
const router = express.Router();
const db = require('../data/helpers/userDb');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const passportSetup = require('../config/passport-setup');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET;
require('dotenv').load();



function generateToken(userId) {
  const payload = {
          sub: userId,
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
	const username=req.body.username;
	const password=req.body.password;
  	const user = {username: username, password: password};
	//console.log(user.username);

 	 db.getUserByName(user.username)
	 .then(response =>{
		//console.log(response.username) 
		//console.log(user.password)
		//console.log(response); 
		const match = bcrypt.compareSync(user.password, response.password);
		//console.log(token); 
		console.log(match);	
		if (match) {
			console.log('sukhi...');
			console.log(response);	
        		let tokenUser = generateToken(response.id);
			//console.log('123...');
			console.log(tokenUser);
			//console.log('Test123...');

			res.status(200).send(tokenUser);
      		} 

		else {
        		res.status(401).json({ error: 'Incorrect credentials' });
      		}
    	})
    	.catch(error => {
      		res.status(500).json({ error:"Failed to login..." });
    })
});


router.get('/google', passport.authenticate('google',{
	scope:['profile']

}));


//callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'),(req,res)=>{

});


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
