const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const getTokenForUser = userObject => {
	return jwt.sign(userObject, secret, { expires: '1h' });
};

module.exports = { getTokenForUser };
