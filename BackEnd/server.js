const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

server.use(express.json())
server.use(cors());

const usersRoutes = require('./routes/authUsers');
const notesRoutes = require('./routes/notes');

// DB

mongoose.connect('mongodb://localhost/notetaking');


// Routes

server.use('/login', usersRoutes);
server.use('/signup', usersRoutes);
server.use('/notes', notesRoutes);


server.get('/APIrunner', (req, res) => {
    res.json({ success: 'API is running' });
})

// Initialize Server
const port = server.get('port') || 5050;
server.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`)
});
