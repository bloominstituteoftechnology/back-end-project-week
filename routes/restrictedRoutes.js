const express = require("express");
const router = express.Router();
const helpers = require("../db/helpers/index");

router.get("/", function(req, res) {
	helpers
		.getNotes()
		.then(notes => {
			return res.json({
				error: false,
				message: notes,
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: true, message: "Server Error" });
		});
});
