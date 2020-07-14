const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const db = require('./notes/projectModel.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

// check if server is running
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running!' });
});

// getting all the notes this is working
server.get('/notes', (req,res) => {
  db
  .getNotes()
  .then(notes => {
    res.status(200).json(notes)
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

// // getting a single note
// server.get('single/notes/:id', (req,res)=> {
//   const {id} = req.params;
//   db
//   .getNote(id)
//   .then(note => {
//     res.status(200).json(note[0]);
//   })
//   .catch(err => {
//     res.status(500).json(err);
//   });
// });

// this is to get a single note and its working
server.get('/single/note/:id', async (req,res) => {
  try {
    const {id} = req.params;
    const note = await note.getNote(id);
   if (note) {
    res.status(200).json(note);

  } else {
    res.status(404).json({err: 'no id'});
  }
} catch(err){
  res.status(500).json(err)
}
}); 


// creating a note this works 
server.post('/notes',(req,res)=> {
  const note = req.body;

    db
    .addNewNote(note)
    .then(ids => {
      res.status(200).json(ids[0]);
    })
    .catch(err =>{
      res.status(500).json(err);
    });
});

// editing a note and this works !!!
server.put('/notes/:id', (req,res)=> {
  const {id} = req.params;
  const changes = req.body;

  db
  .editNote(id, changes)
  .then(count => {
    if (!count || count < 1 ) {
      res.status(404).json({err:'not found!'});
    } else {
      res.status(200).json(count);
    }  
  })
  .catch(err => 
    res.status(500).json(err));
  });

//deleting a note and this works 
server.delete('/notes/:id', (req,res)=> {
  const { id } = req.params;

  db
  .deleteNote(id) // i dont need the count funtion i think? 
  .then(count => {
    if(!count || count < 1 ){
      res.status(404).json({err:'not found'});
    } else {
      res.status(200).json(notes);
    }

  })
  .catch(err => 
    res.status(500).json(err));
  });


module.exports = server;

// may use the count function