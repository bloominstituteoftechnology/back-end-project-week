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
const editNote = require('./backend/editNote/editNote.js')
const userLogin = require('./backend/users/userController.js')

server.use('/api/get', getNote);
server.use('/api/create', createNote);
server.use('/api/delete', deleteNote);
server.use('/api/edit', editNote);
server.use('/api/user/', userLogin);


server.get('/', (req, res)=>{
    res.status(200).json({ api: 'running'})
})

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://oagboghi2:Avatar299@ds217671.mlab.com:17671/obo_lambda_notes', {}, (err => {
    err ? console.log(err) : console.log('Mongoose is connected to our Database')
}))

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})