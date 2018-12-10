const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

//const { authenticate } = require('./middlewares.js');

const db = require('../database/dbConfig.js');

module.exports = server => {
    server.get('/', serverRunning);
    server.get('/api/notes', getNotes); //Display a list of notes.
    //server.post('/api/notes', createNote) //Create a note with a title and content
    //server.get('/api/notes/:id', viewSingleNote);//View an existing note.
    //server.put('/api/notes/:id', updateNote);//Edit an existing note.
    //server.delete('/api/notes/:id', deleteNote);//Delete an existing note.
}


//======= FUNCTION TO SEE SERVER RUNNING ON BASIC ROUTE '/' ========
function serverRunning(req, res) {
    res.send('Server is ON.......NOTES');
}

//======= FUNCTION TO SEE ALL NOTES ROUTE '/api/notes' ========
function getNotes(req, res) {
    db('notes')
            .then(notes => {
                res.status(200).json(notes);   
             })
            .catch(error => {
                response.status(500).json({error : 'The notes data could not be retrieved'})

            })
}
