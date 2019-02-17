require('dotenv').config();

const express  = require('express');
const helmet   = require('helmet');
const morgan   = require('morgan')
const cors     = require('cors');
// const { authenticate } = require('./auth/authenticate.js');

const server = express();
server.use(cors(`http://localhost:${process.env.PORT}`))
server.use(
            helmet(),
            morgan('dev'),
          );

const authenticationRouter = require('./Router/authentication');
const notesRouter = require('./Router/notes_router');

//endpoints
server.use('/api/notes',notesRouter);
server.use('/api/authenticate',authenticationRouter);

//listen
const port = process.env.PORT || 5000;
server.listen(port, () =>{
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
})