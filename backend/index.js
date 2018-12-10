const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const server = express();
const cors = require('cors');
server.use(cors());
server.use(express.json());

server.get('/api/notes', (req, res) => {
	db('notes')
		.then((note) => {
			res.status(200).json(note);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

server.get('/api/notes/:id', (req, res) => {
	const { id } = req.params;

	db('notes')
		.where({ id })
		.then((note) => {
			res.status(200).json(note);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

server.post('/api/createNote', (req, res) => {
	const note = req.body;
	db('notes').insert(note).then((ids) => {
		res.status(201).json(ids).catch((err) => {
			res.status(500).json(err);
		});
	});
});

server.put('/api/notes/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	db('notes').where({ id }).update(changes).then((count) => {
		res.status(200).json(count).catch((err) => {
			res.status(500).json(err);
		});
	});
});

server.delete('/api/notes/:id', (req, res) => {
	const { id } = req.params;
	db('notes').where({ id }).del().then((count) => {
		res.status(200).json(count).catch((err) => {
			res.status(500).json(err);
		});
	});
});

const port = 9000;
server.listen(port, () => console.log(`==^_^== ${port} ==^_^==`));
