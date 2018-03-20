const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

server.use(express.json())
server.use(cors());

mongoose.connect('mongodb://localhost/note-mate-db3');

const usersRoutes = require('./routes/authUsers');
const notesRoutes = require('./routes/notes');

usersRoutes(authUsers);
notesRoutes(notes);

server.get('/', (req, res) => {
    res.json({ success: 'API is running' });
})

// Initialize Server
const port = server.get('port') || 5050;
server.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`)
});
