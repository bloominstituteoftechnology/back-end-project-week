const express = require('express');
const server = express();
const db = require('./data/dbConfig');
const cors = require('cors');
const PORT = process.env.PORT || 8000; //This line is critical, must have process.env.PORT

server.use(express.json());
server.use(cors());

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

server.post('/notes', async(req, res) => {
  const {title, textBody} = req.body;

  try {
    const ids = await db.insert({title, textBody}).into('notes');
    const id = ids[0];

    res.status(201).json(await db('notes').where('id', id).first());
  } catch (err) {
    res.status(404).send(`${err}...notes could not be created`);
  }
})

server.put('/notes/:id', async(req, res) => {
  const {title, textBody} = req.body;
  try {
    const result = await db('notes').where('id', req.params.id).first().update({
      title,
      textBody
    });

    if(result > 0) {
      return res.status(200).json(await db('notes').where('id', req.params.id).first());
    };
  } catch(err) {
    res.status(500).send(`${err}...did not put`)
  }
});

server.delete('/notes/:id', async(req, res) => {
  try {
    const result = await db('notes').where('id', req.params.id).del();

    if(result > 0) {
      return res.status(200).json({result: "DELETED"})
    }
  } catch (err) {
    res.status(500).send(`Server error...${err}`)
  }
})

 server.listen(PORT, () => console.log('App is listening with Heroku :)...'));
