const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const getTokenForUser = userObject => {
	return jwt.sign(userObject, secret, { expiresIn: '1h' });
};

const validateToken = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		res.status(422).json({ error: 'No authorization token found' });
	}
	jwt.verify(token, secret, (authError, decoded) => {
		if (authError) {
			res.status(403).json({ error: 'Token invalid, please login', message: authError });
			return;
		}
		req.decoded = decoded;
		next();
	});
}

module.exports = { getTokenForUser, validateToken };
