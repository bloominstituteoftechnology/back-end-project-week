const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

//const { authenticate } = require('./middlewares.js');

const db = require('../database/dbConfig.js');

module.exports = server => {
    server.get('/', serverRunning);
    server.get('/api/notes', getNotes); //Display a list of notes.
    server.get('/api/notes/:id', viewSingleNote);//View an existing note.
    server.post('/api/notes', createNote) //Create a note with a title and content
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


//===== NOTES GET BY ID ROUTE '/api/notes/:id' ============
function viewSingleNote(req, res) {
    db('notes')
             .where({id : req.params.id})
             .then(note => {
                    res.status(200).json(note); 
              })
             .catch(error => {
                    res.status(500).json({error : 'The data could not be retrieved'})
              }) 
}

//===== POST to create new note ROUTE '/api/notes' ============
function createNote(req, res) {
    if(req.body) {
        db('notes')
                .insert(req.body)
                .then(id => {
                        res.status(201).json(id);
                 })
                .catch(error => {
                        res.status(500).json({message : 'error creating note',error});
                 })
    } else {
        res.status(422).json({message : 'Need correct data to create note..'})
    }
}
 