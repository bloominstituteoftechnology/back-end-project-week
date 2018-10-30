const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(helmet());
server.use(express.json());

const helperMethods = require('./data/helper-methods.js');

server.get('/', (req, res)=>{
    res.send("it's alive!");
});

server.get('/api/note/',(req,res)=>{
    helperMethods.getNotes()
      .then(notes=>{
        res.status(200).json(notes);
      })
      .catch(err=>res.status(500).json(err));
});

server.get('/api/note/:id',(req,res)=>{
  const id = req.params.id;
  helperMethods.getNote(id)
      .then(note=>{
          // console.log(note);
          if (note && note != {}){
              res.status(200).json(note);
          } else {
              res.status(404).json({
              Error: "ID not found"
              })
          }
          })
      .catch(err=>res.status(500).json(err));
});

server.post('/api/note/', (req, res)=>{
  const note = req.body;
  helperMethods.addNote(note)
      .then(id=>{
          res.status(201).json(note);
      })
      .catch(err=>res.status(500).json(err));
});

server.delete('/api/note/:id', (req, res)=>{
  const id = req.params.id;
  helperMethods.deleteNote(id)
    .then(notes =>{
      if (notes && notes.length != 0){
        res.status(200).json({
          Success: "Note deleted."
        });
      } else {
          res.status(404).json({
            Error: "ID not found"
          })
      }
    })
    .catch(err=>res.status(500).json(err));
});

server.put('/api/note/:id', (req, res)=>{
  const id = req.params.id;
  const newNote = req.body;
  helperMethods.updateNote(id, newNote)
    .then(notes =>{
      if (notes && notes.length != 0){
        res.status(200).json({
          Success: "Note updated."
        });
      } else {
        res.status(404).json({
          Error: "ID not found"
        })
      }
    })
    .catch(err=>res.status(500).json(err)); 
})

server.listen(9000, ()=>console.log('\nAPI running on 9000\n'));