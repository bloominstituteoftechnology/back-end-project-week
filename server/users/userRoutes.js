const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('./User');

const secret = 'one does not simply walk into mordor'; //I use the same secret here as I did in my authRoutes

function restricted (req, res, next) {
	const token = req.headers.authorization;
	if(token) {
		jwt.verify(token, secret, (err, verifiedToken) => {
			if (err) {
				res.status(401).json({ error: 'You must be logged in to access this resource.' });
			} else {
				req.jwtPayload = verifiedToken;
				next(); //middleware!
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

//This makes it so that you cannot get a list of users unless you are logged in. Right now this is pretty useless for our app, since we don't ever need to get a list of users in the final product, but it's great for testing purposes and can easily be modified to return, say, a list of notecards, only to logged-in users.

module.exports = router;
