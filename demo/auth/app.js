
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const app = express();
const User = require('./models/users');
const Note = require('./models/notes');
const mongoose = require('mongoose');
const cors = require('cors');
const decode = require('jwt-decode');

mongoose.connect('mongodb://localhost/demo-auth');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
});


let token;

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).json({ err: 'Invalid username/ password'});
            return;
        }
        if (user === null) {
            res.status(422).json({ err: 'No user with that username in our DB'});
            return;
        } 
        user.checkPassword(password, (nonMatch, hashMatch) => {
            if (nonMatch !== null) {
                res.status(422).json({ err: 'passwords don\'t match'});
                return;
            }
            if (hashMatch) {
                token = jwt.sign({ id: user._id, username: user.username }, 'keyboard cat 4 ever', {expiresIn: 129600 });
                        // console.log(decode(token));
                res.json({
                    success:true,
                    err: null,
                    token
                });
            }
        })
    })
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save((err, user) => {
        if (err) return res.send(err);
        res.json({
            succes: 'User saved',
            user
        })
    });
})

app.post('/logout', (req, res) => {
    token = null;
    res.status(200).json({message: 'Succesfully logged out'});
});

app.post('/notes', (req, res) => {
    // create new note
    // const username = decode(token).username;
    // const { title, body } = req.body;
    // User.update({ username: username }, {$push: { notes: { title, body } } }, done)
    //     .then(user => {
    //         res.status(200).json(user.notes);
    //     })
    //     .catch(err => {
    //         res.status(500).json(err);
    //     })
    if (!token) {
        res.status(404).json({message: 'You must be logged in to create a note. '})
    }
    const username = decode(token).username;
    const { title, body } = req.body;
    const newNote = new Note({ title: title, body: body, username: username });
    newNote.save((err, note) => {
        if (err) return res.send(err);
        res.json({
            success: 'note saved',
            note
        })
    })
})

app.get('/notes', (req, res) => {
    // const username = decode(token).username;
    // // console.log(username);
    // User.findOne({ username: username })
    //     // .select('username notes')
    //     .then(user => {
    //         // console.log('user object: '+user);
    //         // console.log('should be username: '+user.username);
    //         // console.log('should be notes array: '+user.notes);
    //         // user.notes.push({ newTitle, newBody });
    //         // user.save(done);
    //         // user.notes.forEach(note => {
    //         //     console.log('note title: '+note.title);
    //         //     console.log('note body: '+note.body);
    //         // })
    //         res.status(200).json(user.notes);
    //     })
    //     .catch(err => {
    //         res.status(500).json(err);
    //     })
    const username = decode(token).username;
    Note.find({ username: username })
        .then(notes => {
            // console.log(notes);
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

app.put('/notes/:note_id', (req, res) => {
    // // update existing note
    // const username = decode(token).username;
    // User.findOne({ username: username })
    //     // .select('notes')
    //     .then(user => {
    //         user.notes.forEach(note => {
    //             if (note.id === req.params.note_id) {
    //                 (req.body.title) ? note.title = req.body.title : null;
    //                 (req.body.body) ? note.body = req.body.body: null;
    //             }
    //         })
    //         console.log(user);
    //         user.save();
    //         // user.save(function(err) {
    //         //     if (err) res.send(err);
    //         //     res.json({ message: 'Note has been updated '});
    //         // });
    //     });
    //     // .save(function(err) => {
    //     //     if (err) res.send(err);
    //     //     res.json({ message: 'Note has been updated '});
    //     // })
});

app.delete('notes/:note_id', (req, res) => {
    // // delete note
    // const username = decode(toke).username;
    // User.findOne({ username: username })
    //     .then(user => {
    //         user.notes = user.notes.filter(note => {
    //             return note.id !== req.params.note_id
    //         })
    //         console.log(user);
    //         user.save();
    //         // user.save(function(err) {
    //         //     if (err) res.send(err);
    //         //     res.json({ message: 'Note has been deleted' });
    //         // })
    //     })
    //     // .save(function(err) => {
    //     //     if (err) res.send(err);
    //     //     res.json({ message: 'Note has been deleted '});
    //     // });
});

app.get('/', jwtMW, (req, res) => {
    res.send('You are authenticated');
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { 
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
