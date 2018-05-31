const mongoose = require("mongoose");

const options = {
	timestamp: true,
	strict: false
};

const User = new mongoose.Schema({
	title: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("User", User);
