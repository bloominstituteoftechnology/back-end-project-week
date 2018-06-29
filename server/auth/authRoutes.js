const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');

const secret = 'one does not simply walk into mordor';
//at some point the secret should probably be in a separate config file and something that's not going to get posted publicly to github but for testing purposes this works

function generateToken(user) {
	const payload = { name: user.username };
	return jwt.sign(payload, secret);
};

router.post('/register', function(req,res) {
	User.create(req.body)
		.then (({ username }) => {
			const token = generateToken({ username });
			res.status(201).json({ username, token });
		}) //generate token and return username & token for testing purposes
		.catch(err => res.status(500).json(err));
	});

router.post('/login', (req,res) => {
	const { username, password } = req.body;
	User.findOne({ username })
		.then(user => {
			if(user) {
				user.validatePassword(password) //bcrypt method set up in User.js
					.then(match => {
						if(match) {
							const { username } = user;
							const token = generateToken ({ username });
							res.status(200).json({ username, token });
							//if the user & password match, generate token
							//then return username and token (for testing purposes)
						} else {
							res.status(404).json({ error: 'invalid credentials' }); //username doesn't match but we don't necessarily want to advertise the specific problem in case someone unauthorized is trying to gain access
						}
					})
					.catch(err => {
						res.status(500).json({ error: 'error processing login' });
					}); //some other server error
				} else {
					res.status(404).json({ error: 'invalid credentials' }); //password doesn't match
				}
			});
	});

module.exports = router;
