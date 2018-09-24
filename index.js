const express = require('express');

const db = require('./dbAccessHelpers');

const server = express();

//routes
const notesRoutes = require('./routes/notesRoutes.js');

//middleware
server.use(express.json());
server.use('/notes', notesRoutes);

server.listen(9000, () => console.log('\n== API on port 9k ==\n'));