const express = require('express');
const cors = require('cors');

const db = require('./dbAccessHelpers');

const server = express();

//routes
const notesRoutes = require('./routes/notesRoutes.js');

//middleware
server.use(cors());
server.use(express.json());
server.use('/', notesRoutes);

server.listen(9000, () => console.log('\n== API on port 9k ==\n'));