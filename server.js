const express = require('express');
const server = express();
const db = require('./data/dbConfig');

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('App is running');
})

server.get('/notes/:id', async (req, res) => {
  if (req.params.id === 'all') {
    try {
      const notes = await db('notes');
      res.status(200).json(notes);
    } catch(err) {
      return res.status(500).send(`Ya done goofed with error: ${err}`);
    }
  } else {
    try {
      const note = await db('notes').where('id', req.params.id).first();
      res.status(200).json(note);
    } catch (err) {
      return res.status(500).send(`Ya done goofed with error: ${err}`)
    }
  }


})

server.listen(8000, () => console.log('App is listening...'));
