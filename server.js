const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const Note = require('./NoteSchema.js');
const User = require('./UserSchema');
const bcrypt = require('bcrypt');


mongoose
.connect('mongodb://localhost/lambdaNotes')
.then(mongo => {
  console.log('connected to lambda-notes backend database');
})
.catch(err => {
  console.log('error connecting to database', err);
})

// const NoteControl = require('./NoteControl');


const server = express();

server.use(helmet());
server.use(cors({}));
server.use(express.json());

server.get('/', (req, res) => { // TEST API 
  res.status(200).json({ api: 'running' });
})
server.get('/notes', (req, res) => { // GET ALL NOTES 
  Note
  .find()
  .then(note => res.json(note))
  .catch( (err) => res.status(500).json({ errorMessage: "The note information could not be retrieved." }))
})
server.get('/notes/:id', (req, res) => { // GET NOTE BY ID 
  const { id } = req.params;
  Notes
  .findById(id)
  .then(note => res.status(200).json(note)) // DOESNT WORK
  .catch( (err) => err ? res.status(404).json({ error: 'Notes not found' }) : res.status(500).end("Server Error"))
})
server.post('/notes', (req, res) => { // POST NEW NOTE 
  const userInput = req.body;
  console.log('\n POST_NOTE \n', userInput);
  const note = new Note(userInput);
    note
      .save()
      .then(note => {
          if (note) {res.status(201, console.log ('\n Successfully created note question \n')).json(note)
        } else {
            res.status(400).json({ msg: 'Please provide question, answer, and answer reference for the note'})
        }
        })
      .catch( (error) => res.status(500).json(error) )
})
server.delete('/notes/:id', (req, res) => { // DELETE NOTES BY ID 
    const { id } = req.params;
    let note;
    console.log("NOTE TO DELETE = ", id);
      Note
        .findById(id)
        .then(foundNote => { 
          note = { ...foundNote[0] };
            Note
            .findByIdAndRemove(id)
              .then(response => res.status(200).json(response))
          })
          .catch((err) => res.status(500).send({ error: 'Error deleting note', err }))
})
server.put('/notes/:id', (req, res) => { // UPDATE NOTE BY ID 
  const { id } = req.params;
  const update = req.body;
  Note
  .findByIdAndUpdate(id, update, {new: true}, (err, note) => {
        if (err) return res.status(500).send(err);
        return res.send(note);
    })
})

server.post('/register', (req, res) => { // REGISTER FOR AN ACCT 
  const { username, password } = req.body;
  const user = new User({ username, password });
  user
  .save()
  .then(user => { res.status(201).json(user) })
  .catch(err => res.status(500).json({ msg: 'error with new user', err }))
  })
  
server.post('/login', (req, res) => { // LOGIN TO ACCT 
  const { username, password } = req.body;
  User
    .findOne({ username })
    .then(user => {
      if(user) {
        user
        .isPasswordValid(password)
        .then(isValid => {
          if(isValid) {
            res.send('Login Successful');
          } else {
            res.status(401).send('password incorrect!!')
          }
        })
      } else {
        res.status(401).send('username incorrect')
      }
    })
    .catch(err => res.status(500).json({ err }))
})

// server.get('/', function(req, res) {
//     res.status(200).json({ api: 'running' });
//   });
  
//   server.use('/api/todo', NoteControl);




const port = process.env.PORT || 5050;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));