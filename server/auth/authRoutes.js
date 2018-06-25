const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/User');

const secret = 'one does not simply walk into mordor';

function generateToken(user) {
	const payload = { name: user.username };
	return jwt.sign(payload, secret);
};

router.post('/register', function(req,res) {
	User.create(req.body)
		.then (({ username }) => {
			const token = generateToken({ username });
			res.status(201).json({ username, token });
		})
		.catch(err => res.status(500).json(err));
	});

router.post('/login', (req,res) => {
	const { username, password } = req.body;
	User.findOne({ username })
		.then(user => {
			if(user) {
				user.validatePassword(password)
					.then(match => {
						if(match) {
							const { username } = user;
							const token = generateToken ({ username });
							res.status(200).json({ username, token });
						} else {
							res.status(404).json({ error: 'invalid credentials' });
						}
					})
					.catch(err => {
						res.status(500).json({ error: 'error processing login' });
					});
				} else {
					res.status(404).json({ error: 'invalid credentials' });
				}
			});
	});

module.exports = router;
