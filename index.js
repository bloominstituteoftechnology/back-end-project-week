require('dotenv').config();

const express  = require('express');
const helmet   = require('helmet');
const morgan   = require('morgan')
const cors     = require('cors');
// const { authenticate } = require('./auth/authenticate.js');

const server = express();
server.use(cors(`http://localhost:${process.env.API_PORT}`))
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
const PORT = process.env.API_PORT || 5000;
server.listen(PORT, () =>{
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`);
})