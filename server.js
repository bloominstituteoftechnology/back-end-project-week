const express = require("express");
const cors = require("cors");

const server = express();

// middleware
server.use(cors());
server.use(express.json());

// root route
server.get("/", (req, res) => {
	res.json({ Message: "Hello there friend" });
});

server.listen(3000, err => {
	if (err) console.log(err);
	console.log("\n === Server listening on port 3000 === \n");
});
