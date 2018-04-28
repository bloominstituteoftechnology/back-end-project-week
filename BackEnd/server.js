const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

server.use(bodyParser.json())
server.use(cors());

const usersRoutes = require('./routes/users');
const notesRoutes = require('./routes/notes');
const authenticate = require('./authentication/auth')

server.use('/users', usersRoutes);
server.use('/notes', notesRoutes);

server.get('/', (req, res) => {
    res.json({ success: 'API is running' });
})

mongoose
.connect('mongodb://localhost/notev3')
.then(db => {
    console.log(`Successfully connected to ${db.connections[0].name} database`);
}).catch(err => {
    console.log({err})
})

const port = server.get('port') || 5050;
server.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`)
});
