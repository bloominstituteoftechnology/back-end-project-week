const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

server.use(express.json())
server.use(cors());

const usersRoutes = require('./routes/users');
const notesRoutes = require('./routes/notes');
const { authenticate } = require('./authentication/auth')

server.use('/user', usersRoutes);
server.use('/notes', notesRoutes);

server.get('/', (req, res) => {
    res.json({ success: 'API is running' });
})

mongoose.connect('mongodb://localhost/note-mate-db3');

const port = server.get('port') || 5050;
server.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`)
});
