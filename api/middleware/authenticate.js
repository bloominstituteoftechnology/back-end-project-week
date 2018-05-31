const jwt = require('jsonwebtoken');
const { mysecret } = require('../../utils/dbConfig');

const authenticate = (req, res, next) => {
	const token = req.get('Authorization');
	if (token) {
		jwt.verify(token, mysecret, (err, decoded) => {
			if (err) return res.status(422).json(err);
			req.decoded = decoded;
			next();
		});
	} else {
		res.status(403).json({ error: 'no token provided.' });
	}
};

module.exports = { authenticate };
