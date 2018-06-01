const express = require('express'); 
const router = express.Router(); 
 
const User = require('./User'); 
 
router.route('/').get((req, res) => { 
	 
	User.find()
		.then(users => { 
			res.status(200).json(users); 
		}) 
		.catch(err => { 
			res.status(500).json({ errorMessage: 'failed' }); 
		}); 
}); 
 
router.route('/').post((req, res) => { 
	if (!req.body.username) { 
		res.status(400).json({ errorMessage: 'no username' }); 
	} else { 
		const newUser = new User(req.body); 
		newUser 
			.save() 
			.then(newUser => { 
				res.status(201).json(newUser); 
			}) 
			.catch(err => { 
				res.status(500).json({ errorMessage: 'error saving' }); 
			}); 
	} 
}); 
 
module.exports = router; 