require('dotenv').config();
const {server} = require('./Api/server');
const db = require('./Database/dbConfig');
const port = process.env.PORT || 5000;

server.get('/api/notes', (req, res) => {
    db.getNotes().then( notes => {
        res.status(200).json(notes);
    })
    .catch(err => {message: err});
    
 })

server.post('/api/notes', (req, res) => {
    const note = req.body
     db.insert(note).then(newNote => {
         res.status(201).json({message: "new note has been added"})
     })
     .catch(err => {message: err});
})

server.put('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(noteId => {
        res.status(302).json(noteId);
    })
    .catch(err => {message: err})
})

server.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    db.removeNote(id).then(removedNote => {
        res.status(200).json({message: `note with id${id} has been removed`});
    })
    .catch(err => {message: err})
})




server.listen(port, () => {
    console.log(`Server listening on ${port}`);
})