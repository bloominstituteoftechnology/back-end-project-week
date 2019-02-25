require('dotenv').config();
const {server} = require('./Api/server');
const db = require('./Database/dbConfig');
const port = process.env.PORT || 5000;

//gets notes

server.get('/api/notes', (req, res) => {
    db.getNotes().then( notes => {
        res.status(200).json(notes);
    })
    .catch(err => {message: err});
    
 })

 //posts new notes

server.post('/api/notes', (req, res) => {
    const note = req.body
     db.insert(note).then(newNote => {
         res.status(201).json({message: "new note has been added"})
     })
     .catch(err => {message: err});
})

//gets a note by id

server.get('/api/note/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(response => {
        res.status(200).json(response);
    })
    .catch(err => {message: err})
})

//deletes note by id

server.delete('/api/note/delete/:id', (req, res) => {
    const id = req.params.id;
    db.removeNote(id).then(removedNote => {
        res.status(200).json({message: `note with id${id} has been removed`});
    })
    .catch(err => {message: err})
})

// updates existing note

server.put('/api/note/edit/:id', (req, res) => {
    const id = req.params.id;
    const note = req.body;
    db.updateNote(id, note).then(updateNote => {
        res.status(201).json({message: `note with id${id} has been updated`})
    })
    .catch(err => {message: err})
})


server.listen(port, () => {
    console.log(`Server listening on ${port}`);
}) 