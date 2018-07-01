const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = 'Secret is yours';

require('dotenv').config();

const server = express();

const corsOptions = {
    origin: "http://localhost:3000", //allow only the React application to connect
    credentials: true, // sets the Acess-Control-Allow-Credential CORS header
};

server.use(cors( corsOptions ));
server.use(express.json());



const validateToken = (req, res, next) => {
  // this piece of middleware is taking the token delivered up to the server and verifying it
  // if no token is found in the header, you'll get a 422 status code
  // if token is not valid, you'll receive a 401 status code
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(422)
      .json({ error: 'No authorization token found on Authorization header' });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ error: 'Token invalid, please login', message: err });
      } else {
        // token is valid, so continue on to the next middleware/request handler function
        next();
      }
    });
  }
};

const getNote = require('./backend/getNote/getNote.js');
const createNote = require('./backend/createNote/createNote.js')
const deleteNote = require('./backend/deleteNote/deleteNote.js')
const editNote = require('./backend/editNote/editNote.js')
const userLogin = require('./backend/users/userController.js')

server.use('/api/get', validateToken, getNote);
server.use('/api/create', validateToken, createNote);
server.use('/api/delete', validateToken, deleteNote);
server.use('/api/edit', validateToken, editNote);
server.use('/api/user/', userLogin);


server.get('/', (req, res)=>{
    res.status(200).json({ DB: `${process.env.mongoUrl}`})
})

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoUrl, {}, (err => {
    err ? console.log(err) : console.log('Mongoose is connected to our Database')
}))

const port = process.env.PORT || 5000;
server.listen(port, '0.0.0.0',() => {
    console.log(`Server up and running on ${port}`)
})