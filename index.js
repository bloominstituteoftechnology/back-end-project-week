const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = require('./server.js');

server.listen(3333, () => 
    console.log('Server is listening on port 3333.') 
);

/* 
- Display a list of notes.
- Create a note with a _title_ and _content_.
- View an existing note.
- Edit an existing note.
- Delete an existing note. 
*/

//Get all Notes
server.get('/api/notes', (req, res) => {
    db.select().from('notes')
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json({ error: "Couldn't get list of notes; please try again." });
    })
  });
  
  //Get individual Note by ID
  server.get('/api/notes/:id', (req, res) => {
  
    const { id } = req.params;
    const { note }= req.body;
  
    db('notes')
    .where({id: id})
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(500).json({ error: "Couldn't get the requested note; please try again." });
    })
  });
  
  //Create a new Note
  server.post('/api/notes', (req, res) => {
    const note = req.body;
  
    db.insert(note)
      .into('notes')
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  //Edit a Note
  server.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
  
    db('notes')
    .where({id: id})
    .update({ title, contents })
    .then(note => {
            return res.status(200).json({ message: 'Note has been updated.'});
    })
    .catch(err => {
        res.json(500).json({ error: "This note could not be modified." })
    })
  })

  // Delete a Note
  server.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
  
    db('notes')
      .where({ id })
      .del()
      .then(note => {
          if (note) {    
              res.status(200).json({message: 'Note deleted.'});
          } else {
              res.status(404).json({ message: "The note with the specified ID does not exist." })
          }
      })
          .catch(err => {
          res.status(500).json({message: "Unable to delete note."});
      })
  });
  
  