const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const notesRoutes = require('./notes/notesRoutes');

const PORT = 8000;

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/notes', notesRoutes);

server.listen(PORT, e => {
  if (e) console.log(e);
  console.log(`\n==== API running on port ${PORT} ====\n`);
});