const User = require('../models/UserModel');
const { getTokenForUser } = require('../services/auth');

const createUser = (req, res) => {
	const {
		firstName,
		lastName,
		email,
		password
	} = req.body;
	const user = new User({
		firstName,
		lastName,
		email,
		password
	});
	user.save((err, user) => {
		if (err) return res.send(err);
		res.json({ success: 'User saved', user });
	});
};

const login = (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err) {
			res.status(500).json({ error: 'Invalid username or password' });
			return;
		}
		if (email === null) {
			res.status(422).json({ error: 'No user with that email in our DB' });
			return;
		}
		user.checkPassword(password, (nonMatch, hashMatch) => {
			if (nonMatch !== null) {
				res.status(422).json({ error: 'passwords dont match' });
				return;
			}
			if (hashMatch) {
				const token = getTokenForUser({ email: user.email });
				res.json({ token });
			}
		});
	});
};

module.exports = { createUser, login };
