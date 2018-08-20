

function authenticate(req, res, next) {
	if (req.session && req.session.username) {
		next();
	} else {
		res.status(400).send('Access Denied');
	}
};

module.exports = {
    authenticate
}