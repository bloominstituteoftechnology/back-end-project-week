const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send('it\'s alive');
});

server.get('/api/notes', (req, res) => {
    db('notes')
	.then(notes => {
	    res.status(200).json(notes);
	})
	.catch(err => res.status(500).json(err));
});

server.get('/api/notes/:id', async (req, res) => {
    const {id} = req.params;
    const note = await db('notes')
	  .wehre({id})
	  .first();
    if(note) {
	res.status(200).json(note);
    } else {
	res.status(404).json({message: 'zoo not found'});
    }
});

server.post('/api/notes', (req, res) => {
    const note = req.body;
    db.insert(note)
	.into('notes')
	.then(ids => {
	    res.status(201).json(ids[0]);
	})
	.catch(err => res.status(500).json(err));
});

server.delete('/api/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes')
	.where({id})
	.del()
	.then(count => {
	    if (!count || count < 1) {
		res.status(404).json({message: 'No records found to remove'});
	    } else {
		res.status(200).json(count);
	    }
	})
	.catch(err => res.status(500).json(err));
});

server.put('/api/notes/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    db('notes')
	.where({id})
	.update(changes)
	.then(count => {
	    res.status(200).json(count);
	})
	.catch(err => res.status(500).json(err));
});

const port = process.env.PORT || 3300;
// const port = 3300;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
