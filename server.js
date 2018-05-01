const express = require('express');
//const helmet = require('helmet');
//const cors = require('cors');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://ajmal:ZargoKhwaga123!@ds111050.mlab.com:11050/notes')
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(error => {
    console.log('Error connecting to the server');
  });

//const friendsController = require('./friends/friendsController');


const server = express();

//server.use(helmet());
//server.use(cors());
server.use(express.json());


const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
const Note = mongoose.model('note', noteSchema);

server.get('/', (req, res) => {
  Note.find()
    .then(notes => {
      res
        .status(200)
        .json(notes)
    })
    .catch(err => {
      res
        .status(500)
        .json('error: could not get notes from the database');
    })
});

server.post('/', (req, res) => {
  const newNote = new Note(req.body);
  console.log(newNote);
  newNote.save()
    .then(response => {
      res
        .status(201)
        .json(response)
    })
    .catch(error => {
      res
        .status(505)
        .json('error: data could not saved to DB');
    });
});


//server.use('/api/friends', friendsController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
