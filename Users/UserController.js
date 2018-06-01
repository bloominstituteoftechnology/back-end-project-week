const User = require ('./userSchema');
const Token = require('../Middleware/Token');

const UserController = {
	getUsers: (req, res) => {
        User
        .find()
	    .select({ username: 1 })
			.then(users => res.status(200).json(users))
			.catch(err =>  res.status(404).json(err));
	},
	createUser: (req, res) => {
		const userInfo = req.body;
		if('username' in userInfo && 'password' in userInfo) {
			const newUser = new User(userInfo);
			newUser.save()
				.then(doc => {
					const token = Token(doc);
					res.status(201).json({
						user: { _id: doc._id, username: doc.username },
						token
					});
				})
				.catch(err => res.status(500).json({err: 'Something went wrong'}));
		} else {
			res.status(500).json({err: 'must provide a username and password'});
		}
	},
	login: (req, res) => {
		res.status(200).json({ token: Token(req.user), user: req.user });
	},
	logout: (req, res) => {
		if(req.session) {
			req.session.destory(err => {
				if(err) res.status(500).json({error: 'error logging out'});
				else res.status(200).send('Logged out');
			});
		} else {
			res.send('User not logged in');
		}
	}
};

module.exports = UserController;