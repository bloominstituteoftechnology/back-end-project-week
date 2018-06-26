const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const TodosRouter = require('./Notes/notesRouter.js');
const UserRouter = require('./Users/userRouter.js');


const server = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET, PUT, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
 };
server.use(helmet());
server.use(express.json());
server.use(cors(corsOptions))

server.get('/', (req, res) => res.send('API Running...'));

server.use('/api/users', UserRouter);
server.use('/api/todos', TodosRouter);


const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/LambdaNotes', {}, err => {
  if (err) console.log('Database connection failed');
  console.log('Sucessfully connected to LambdaNotes db')
})


server.listen(port, () => {
    console.log(`Server up and running on ${port}`);
  });