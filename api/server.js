const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const db = require('../data/dbConfig');
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.get('/', async (req, res) => {
  const notes = await db('notes').orderBy('id', 'desc');
  res.status(200).json({ notes });
});

server.get('/note/get/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await db('notes')
      .where('notes.id', '=', id)
      .first();

    if (note) {
      return res.status(200).json({ note });
    } else {
      return res.status(404).json({ message: 'note not found', err });
    }
  } catch (err) {}
});

server.post('/note/create', async (req, res, next) => {
  if (!req.body.title || !req.body.textBody) {
    next(Error('CONTENT_REQUIRED'));
  }
  const note = req.body;
  try {
    const notes = await db('notes')
      .returning('id')
      .insert(note);
    return res.status(200).json({ notes });
  } catch (err) {
    next();
  }
});

server.put('/note/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const note = await db('notes')
      .returning('id')
      .where({ id })
      .update(changes);
    if (note) {
      return res.status(200).json({ note });
    } else {
      res.status(404).json({ message: 'note not found', err });
    }
  } catch (err) {
    next();
  }
});

server.delete('/note/delete/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await db('notes')
      .where({ id })
      .del();
    if (note) {
      return res.status(200).json({ message: 'success' });
    } else {
      res.status(404).json({ message: 'note not found' });
    }
  } catch (err) {
    next();
  }
});

server.use((err, req, res, next) => {
  switch (err.message) {
    case 'CONTENT_REQUIRED':
      return res
        .status(400)
        .json({ message: 'please include title and note body' });
    default:
      return res.statsu(500).json(err.message);
  }
});

module.exports = server;
