const express = require('express'); // remember to install your npm packages
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config()

const db = require('./_config/db.js'); //Creates a db server connection promise
const setupMiddleware = require('./_config/middleware');

//Create API sub-applications routers here
// const modelsRouter = require('./models/modelsRouter.js');
const notesRouter = require('./notes/notesRouter.js');
const usersRouter = require('./users/usersRouter.js');
const authRouter = require('./auth/authRouter.js');


const server = express();

//connects to the database
db
  .connectTo('lambda_notes')
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

server.use(helmet());
server.use(cors());
server.use(express.json());

// Create API routes
// server.use('route', subAPIRouter);
server.get('/', (req, res) => res.send('Lambda Notes API Running...')); //Main route

server.use('/api/notes', notesRouter);
server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Lambda Notes Server up and running on ${port}`);
});