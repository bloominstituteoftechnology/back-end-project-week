const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const port = process.env.PORT || 5555;


const db = require('./data/db');
const notesRouter = require('./notes/notesRouter');
const usersRouter = require('./users/usersRouter');

const server = express();

db
    .connectTo()
    .then(() => console.log('\n... API Connected to Database ...\n'))
    .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));



server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/notes', notesRouter);
server.use('/api/users', usersRouter);

// sanity check route
server.get('/', (req, res) => res.send('API Running...'));

server.listen(port, () =>
    console.log(`\n\nAPI running on http://localhost:${port}`)
);