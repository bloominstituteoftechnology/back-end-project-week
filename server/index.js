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
//get all notes
server.get("/notes", (req, res) => {
	db("notes")
		.then(note => {
			res.status(200).json(note);
		})
		.catch(err => {
			res.status(400).json({ error: "Could not grab notes" });
		});
});
//GET one note by id
server.get("/notes/:id", (req, res) => {
	const id = req.params.id;
	db("notes")
		.where(id)
		.then(note => {
			res.status(200).json(note);
		})
		.catch(err => {
			res.status(400).json({ error: "could not find note" });
		});
});
//POST req to add a new note
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

server.put("/notes/:id", (req, res) => {
	const id = req.params.id;
	const { title, body } = req.body;
	const note = { title, body };
	db("notes")
		.where({ id: id })
		.update({ title: note.title, body: note.body })
		.then(note => {
			res.status(200).json(note);
		})
		.catch(err => {
			res.status(400).json({ error: "could not update note" });
		});
});

server.listen(port, () => {
	console.log(`Server now listening on Port ${port}`);
});
