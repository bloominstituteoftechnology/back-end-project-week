const express = require("express");
const router = express.Router();

const User = require("./User");

router.route("/").post((req, res) => {
	const newUser = new User(req.body);
	console.log(newUser);
	if (!req.body.username) {
		res.status(400).json({ errorMessage: "Please provide a username" });
	}

	newUser
		.save()
		.then(newUser => {
			console.log(newUser);
			res.status(201).json(newUser);
		})
		.catch(err => {
			res.status(500).json({
				errorMessage: "There was an error saving the user to the database."
			});
		});
});

module.exports = router;
