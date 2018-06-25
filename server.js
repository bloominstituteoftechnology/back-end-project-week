const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = express();

server.use(cors());
server.use(express.json());

const getNote = require('./backend/getNote/getNote.js');
const createNote = require('./backend/createNote/createNote.js')
const deleteNote = require('./backend/deleteNote/deleteNote.js')

const Notes = require('./backend/notesModel/notesModel.js')


server.use('/api/get', getNote);
server.use('/api/create', createNote);
server.use('/api/delete', deleteNote);

server.get('/', (req, res)=>{
    res.status(200).json({ api: 'running'})
})

// server
//     .post('/api/create', (req, res) => {
//         const { title, content } = req.body;
//         const newNote = new Notes({ title, content });
//         newNote
//             .save()
//             .then(note => {
//                 res.status(201).json({ note })
//             })
//             .catch(err => {
//                 conole.log(err)
//                 res.status(500).json({ errorMessage: err })
//             })
//     })

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/LambdaNotes', {}, (err => {
    err ? console.log(err) : console.log('Mongoose is connected to our Database')
}))

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})