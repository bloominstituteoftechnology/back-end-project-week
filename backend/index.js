const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const server = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

server.use(helmet());
server.use(morgan('short'));
server.use(cors());
server.use(express.json());

// get all notes
server.get('/api/notes', (req, res) => {
	db('notes')
		.then((note) => {
			res.status(200).json(note);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// get a note by id
server.get('/api/note/:id', (req, res) => {
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

// create a note
server.post('/api/createnote', (req, res) => {
	const note = req.body;
	db('notes').insert(note).then((ids) => {
		res.status(201).json(ids).catch((err) => {
			res.status(500).json(err);
		});
	});
});

//edit a note
server.put('/api/editnote/:note_id', (req, res) => {
	const changes = req.body;
	console.log(changes);
	const { note_id } = req.params;
	db('notes')
		.where({ id: note_id })
		.update(changes)
		.then((count) => {
			res.status(200).json({ count });
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// delete a note
server.delete('/api/notes/:id', (req, res) => {
	const { id } = req.params;
	db('notes').where({ id }).del().then((count) => {
		res.status(200).json(count).catch((err) => {
			res.status(500).json(err);
		});
	});
});

const port = 9000;
server.listen(port, () => console.log(`This port is over ${port}!!!`));
