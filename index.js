const mongoose = require('mongoose');
const server = require('./api/server');
const config = require('./api/config.js');
const NotesRoutes = require('./notes/NotesRoutes');
const UsersRoutes = require('./users/UsersRoutes');

const port = config.port || 8000;
mongoose
    .connect('mongodb://localhost/notesdb')
    .then(() => {
        console.log('connected to notes database');
        server.listen(config.port, () => {
            console.log(`Connected to port ${config.port}`);
        });
    })
    .catch(err => {
        console.log('error connecting to notes database');
    });