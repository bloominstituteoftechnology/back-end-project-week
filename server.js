const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3333;
const server = express();

// middleware
server.use(cors());
server.use(express.json());

// root route
server.get("/", (req, res) => {
	res.json({ Message: "Hello there friend" });
});

server.listen(port, err => {
	if (err) console.log(err);
	console.log("\n === Server listening on port 3000 === \n");
});
