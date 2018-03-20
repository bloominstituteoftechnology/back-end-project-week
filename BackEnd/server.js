const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

server.use(express.json())
server.use(cors());

const usersRoutes = require('./routes/users');
// const notesRoutes = require('./routes/notes');

// DB

mongoose.connect('mongodb://localhost/notetaking');


// Routes

server.use('/', usersRoutes);


// Initialize Server
const port = server.get('port') || 5050;
server.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`)
});
