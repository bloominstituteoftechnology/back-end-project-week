const mongoose = require('mongoose');
const server = require('./api/server');

const port = 8000;

mongoose
    .connect('mongodb://localhost/notesdb')
    .then(() => {
        console.log('connected to notes database');
        server.listen(port, () => {
            console.log(`Connected to port ${port}`);
        });
    })
    .catch(err => {
        console.log('error connecting to notes database');
    });