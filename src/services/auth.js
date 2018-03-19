const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const getTokenForUser = userObject => {
	return jwt.sign(userObject, secret, { expiresIn: '1h' });
};

module.exports = { getTokenForUser };
