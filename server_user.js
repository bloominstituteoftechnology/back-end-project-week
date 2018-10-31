const db = require('./helpers/login helpers.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('./secret.js')

const validate = (req,res,next) => {
const {username,password} = req.body;
if(!username || !password){res.status(400).json('use both a username and password!')
next();}
else{
next();
}
};

function generateToken(user){
const payload = {...user};
return jwt.sign(payload, secret)
};

router.post('/api/register',validate, (req,res) => {
const {username,password} = req.body;
const hashed = bcrypt.hashSync(password, 14);
db.add({username:username,password:hashed})
	.then(response => {
	res.status(201).json('new user created');
	})
	.catch(err => {
	res.status(500).json('internal server error');
	})
})

router.post('/api/login',validate, (req,res) => {
const { username,password } = req.body;
db.findByUsername(username)
	.then(response => {
	if(!response){res.status(400).json('invalid username or password');}
	else if(bcrypt.compareSync(password, response.password)){
	const token = generateToken(response);
	res.status(200).json({token,username});}
	else{res.status(400).json('invalid username or password');}
	})
	.catch(err => {
	res.status(500).json(err);
	})
})

module.exports = router;