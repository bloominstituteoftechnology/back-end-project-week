const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mysecret = 'Secret is yours';

require('dotenv').config();

const server = express();

const corsOptions = {
    origin: "https://clever-einstein-e635c5.netlify.com", //allow only the React application to connect
    //origin: "http://localhost:3000/",
    credentials: true, // sets the Acess-Control-Allow-Credential CORS header
};

server.use(cors( corsOptions ));
server.use(express.json());



const authenticate = (req, res, next) => {
    const token = req.headers.Authorization;
    console.log(token);
    if (token) {
        jwt.verify(token, mysecret, (err, decoded) => {
            if (err) return res.status(422).json(err);
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).json({
            error: 'No token provided, must be set on the Authorization Header'
        });
    }
};

const getNote = require('./backend/getNote/getNote.js');
const createNote = require('./backend/createNote/createNote.js')
const deleteNote = require('./backend/deleteNote/deleteNote.js')
const editNote = require('./backend/editNote/editNote.js')
const userLogin = require('./backend/users/userController.js')

server.use('/api/get', authenticate, getNote);
server.use('/api/create', authenticate, createNote);
server.use('/api/delete', authenticate, deleteNote);
server.use('/api/edit', authenticate, editNote);
server.use('/api/user/', userLogin);


server.get('/', (req, res)=>{
    res.status(200).json({ DB: `${process.env.mongoUrl}`, cors: corsOptions})
})

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoUrl, {}, (err => {
    err ? console.log(err) : console.log('Mongoose is connected to our Database')
}))

const port = process.env.PORT || 5000;
server.listen(port, '0.0.0.0',() => {
    console.log(`Server up and running on ${port}`)
})