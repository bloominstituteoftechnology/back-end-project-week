const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const helpers = require("../db/helpers");

function generateToken(payload) {
	return jwt.sign(payload, process.env.SECRET || "secret", {
		expiresIn: "1h",
	});
}

router.post("/login", function(req, res, next) {
	let { username, password } = req.body;

	if (!username || !password)
		return res.json({
			error: true,
			message: "bad info friendo",
		});

	helpers.authenticateUser(username, password, (err, userId) => {
		if (err) {
			return res.json({ error: true, message: err });
		}
		let token = generateToken({ id: userId });
		res.json({ error: false, message: "Authenticated YESssssss!", token });
	});
});

router.post("/register", function(req, res, next) {
	console.log(req.body);
	let { username, password } = req.body;

	if (!username || !password)
		return res.json({
			error: true,
			message: "Please provide a Username, Password",
		});

	helpers.addUser({ username, password }).then(response => {
		let id = response[0];
		let token = generateToken({ id });
		res.json({ error: false, message: "Good jerb you registered", token });
	});
});

module.exports = router;
