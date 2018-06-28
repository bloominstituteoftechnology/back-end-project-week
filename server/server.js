require('dotenv').load();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const NotesRouter = require('./Notes/notesRouter.js');
const UserRouter = require('./Users/userRouter.js');



const server = express();

server.use(cors({ origin:'https://vibrant-darwin-54252a.netlify.com' }));

server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => res.send('API Running...'));

server.use('/api/users', UserRouter);
server.use('/api/notes', NotesRouter);


const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${process.env.MLABUSERNAME}:${process.env.MLABPASSWORD}@ds121301.mlab.com:21301/annecourtneytodolist`, {}, err => {
  if (err) console.log('Database connection failed');
  console.log('Sucessfully connected to LambdaNotes db')
})


server.listen(port, () => {
    console.log(`Server up and running on ${port}`);
  });