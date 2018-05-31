const express = require('express');
const cors = require('cors');
const server = express();
const mongoose = require('mongoose');


const mlab = `mongodb://imsdhk:123456a@ds121599.mlab.com:21599/backend_lambda`;
// const localDb = 'mongodb://localhost/localDb_be'

const Note = require('./src/notes/noteModel');

server.use(cors());
server.use(express.json());

// mongoose.connect(`mongodb://imsdhk:123456a@ds121599.mlab.com:21599/backend_lambda`, {}, err => {
//     if (err) return console.log(err);
//     console.log('=== Connected to database! ===');
// })

mongoose.connect(mlab, () => {
    console.log('connected to mLab');
});

server.get('/', (req, res) => {
    res.send("hello ")
})

server.get('/notes', (req, res) => {
    Note.find().then(resp => res.json(resp))
})


server.post('/notes', (req, res) => {
    Note.create(req.body).then(resp => res.status(201).json(resp))

});


server.delete('/delete/:id', function (req, res) {
    const id = req.params.id;
    Note.remove({ _id: id })
        .then(response => {
            if (response.ok === 1) {
                res.status(200).json({ message: `succussfully deleted the note with id: ${id}` });
            } else {
                res.status(404).json({ message: "The note with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The note information could not be retrieved." });
        });
});


server.put('/edit/:id', (req, res) => {
    console.log('in server put')
    const { id } = req.params;
    const { noteTitle, noteBody } = req.body;
    Note.update({ _id: id }, req.body)
        .then(isPresent => {
            (!req.body.noteTitle || !req.body.noteBody) ? res.status(400).json({ errorMessage: "Please provide noteTitle and noteBody for the post." })
                : isPresent ? res.status(200).json(req.body)
                    : res.status(404).json({ message: "The post with the specified ID does not exist." });
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." });
        });
});



const port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
});