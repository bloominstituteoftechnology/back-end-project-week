const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3333;

const db = require("./data/db");
const usersRouter = require("./users/usersRouter");
// const notesRouter = require("./notes/notesRouter");

const server = express();

db
	.connectTo()
	.then(() => {
		console.log("\n... API Connected to Database ...\n");
	})
	.catch(err => {
		console.log(err);
		console.log("\n*** ERROR Connecting to Database ***\n");
	});

// middleware
server.use(cors());
server.use(express.json());

// application routes
server.use("/api/users", usersRouter);
// server.use("/api/notes", notesRouter);

// root route
server.get("/", (req, res) => {
	res.json({ Message: "Hello there friend" });
});

server.listen(port, err => {
	if (err) console.log(err);
	console.log(`\n === Server listening on ${port} === \n`);
});
