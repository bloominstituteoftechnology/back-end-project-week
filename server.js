const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const server = express();

const corsOptions = {
    origin: "http://localhost:3000", //allow only the React application to connect
    credentials: true, // sets the Acess-Control-Allow-Credential CORS header
};

server.use(cors( corsOptions ));
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
    res.status(200).json({ DB: `${process.env.mongoUrl}`})
})

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoUrl, {}, (err => {
    err ? console.log(err) : console.log('Mongoose is connected to our Database')
}))

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})