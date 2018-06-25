const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./User');

const secret = 'one does not simply walk into mordor';

function restricted (req, res, next) {
	const token = req.headers.authorization;
	if(token) {
		jwt.verify(token, secret, (err, verifiedToken) => {
			if (err) {
				res.status(401).json({ error: 'You must be logged in to access this resource.' });
			} else {
				req.jwtPayload = verifiedToken;
				next();
			}
		});
	} else {
		res.status(401).json({ error: 'You must be logged in to access this resource.' });
	}
}

router.get('/', restricted, (req, res) => {
	User.find()
		.select('-password')
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(500).json(err);
		});
	});

module.exports = router;
