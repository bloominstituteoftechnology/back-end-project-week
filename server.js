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
});

server.post('/notes', async(req, res) => { //May want to rename description to content
  const {title, description} = req.body;

  try {
    const ids = await db.insert({title, description}).into('notes');
    const id = ids[0];

    res.status(201).json(await db('notes').where('id', id).first());
  } catch (err) {
    res.status(404).send(`${err}...notes could not be created`);
  }
})

server.put('/notes/:id', async(req, res) => {
  const {title, description} = req.body;
  try {
    const id = await db('notes').where('id', req.params.id).first().update({
      title,
      description
    });
    console.log('IDDD', id);
    console.log('REQSSS', req.params.id);
    
    if(id > 0) {
      return res.status(200).json(await db('notes').where('id', req.params.id).first());
    };
  } catch(err) {
    res.status(500).send(`${err}...did not put`)
  }
})

server.listen(8000, () => console.log('App is listening...'));
