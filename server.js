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

function restricted(req, res, next) {
    const token = req.headers.authorization;
    console.log(token)
    if (token) {
        console.log("if successful, run this block of code", token)
        jwt.verify(token, secret, (err, decodedToken => {
            req.jwtPayload = decodedToken;
            if (err) {
                return res.status(401).json({ message: "Does not pass verification" })
            }
            next();
        }))
    } else {
        return res.status(401).json({ message: "Does not pass token" })
    }
}

const getNote = require('./backend/getNote/getNote.js');
const createNote = require('./backend/createNote/createNote.js')
const deleteNote = require('./backend/deleteNote/deleteNote.js')
const editNote = require('./backend/editNote/editNote.js')
const userLogin = require('./backend/users/userController.js')

server.use('/api/get', restricted, getNote);
server.use('/api/create', restricted, createNote);
server.use('/api/delete', restricted, deleteNote);
server.use('/api/edit', restricted, editNote);
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