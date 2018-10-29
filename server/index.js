const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);
const server = express();
const port = 3300;
const cors = require("cors");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/notes", (req, res) => {
	db("notes")
		.then(note => {
			res.status(200).json(note);
		})
		.catch(err => {
			res.status(400).json({ error: "Could not grab notes" });
		});
});

server.post("/notes/", (req, res) => {
	const { title, body } = req.body;
	const note = { title, body };
	db("notes")
		.insert(note)
		.then(note => {
			res.status(201).json(note);
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({ error: "could not create note" });
		});
});

server.listen(port, () => {
	console.log(`Server now listening on Port ${port}`);
});
