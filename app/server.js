// 2 + 2 === 4;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const cors = require('cors');
const corsOptions = {
    origin: 'https://peaceful-meadow-91763.herokuapp.com/',
    credentials: true
};

const server = express();

// const { login } = require('./login.js');
const Note = require('./noteModel');
const User = require('./userModel');

server.use(bodyParser.json());
server.use(cors());
// server.use(corsOptions);

const url = process.env.MONGOLAB_URI;


mongoose.connect('mongodb://dude:bro@ds151153.mlab.com:51153/heroku_srq65m10', {}, err => {
    if(err) return console.log(err);
    console.log('Mango Up Bruh');
})

// server.get('/', (req, res) => {
//     res.status(200).json({api: 'notes'})
// })

// Notes Routes



server.get('/', (req, res) => {
    console.log('Notes api')
    Note
    .find({})
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(error => {
        res.status(500).json({ error: 'No notes!' })
    })
})

server.post('/new', (req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    console.log('New Note')
    newNote
    .save()
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(422).json({ err: 'Error when creating the note' });
    });
})

server.put('/:_id', (req, res) => {
    // const { _id, title, content } = req.body;
    // const id = { _id };
    // if(!id) {
    //     return res.status(422).json({error: 'Must provide a valid ID.'});
    // }
    // Note.findById(id, (err, note) => {
    //     if(err || note === null) {
    //         res.status(422).json({error: 'Cannot find a note with that ID.'});
    //         return;
    //     }
    //     note.title = title
    //     note.content = content
    //     .save((saveErr, savedNote) => {
    //         if(err || note === null) {
    //             res.status(500);
    //             res.json({ error:'Something really bad happened.'})
    //             return;
    //         }
    //         res.json(note);
    //     });
    // });

    Note.findByIdAndUpdate(req.params._id, req.body)
    .then(() => {
        res.status(200).json({update: 'Note Updated'})
    })
    .catch(err => {
        res.status(500).json(err)
    })
});


server.delete('/:_id', (req, res) => {
    Note.findByIdAndRemove(req.params._id)
    .then(() => {
        res.status(200).json({status: 'Note Deleted'})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// New User Routes //

server.get('/users', (req, res) => {
    User
    .find({})
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ err: 'Could not display users...' })
    })
})

server.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    newUser
    .save()
    .then(newuser => {
        res.status(200).json(newuser)
    })
    .catch(err => {
        res.status(422).json({ err: 'Could not create user...' });
    })

})

// server.post('/notes/login', (req, res) => {

// });



const port = process.env.PORT || 5000;

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`Mangos Grown at ${port}`)
})



