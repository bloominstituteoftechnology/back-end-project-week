const express = require('express');
const router = express.Router();
const Note = require('./Note');

require('dotenv').config();

////
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt')
////

////
// helper function
const localStrategy = new LocalStrategy(function(username, password, done) {
    User.findOne({username}).then(user => {
        if(!user) {
            done(null, false);
        } else {
            user
            .validatePassword(password)
            .then(isValid => {
                const { _id, username } = user;
                return done(null, { _id, username });
            })
            .catch(err => {
                return done(err);
            })
        }
    }).catch(err => done(err))
})


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.secret
    // secretOrKey: secret
}

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findById(payload.sub)
    .then(user => {
        if(user) {
            done(null, user)
        } else {
            return done(null, false)
        }
    })
    .catch(err => {
        return done(err);
    })
});

// passport global middleware
passport.use(localStrategy);
passport.use(jwtStrategy);

// passport local middleware
const passportOptions = { session: false };
const authenticate = passport.authenticate('local', passportOptions);
const protected = passport.authenticate('jwt', passportOptions);
////

router
    .route('/')

    .get(protected, (req, res) => {
        Note.find()
            .then(notes => {
                res.json(notes);
            })
            .catch(err => {
                res.status(500).json({ error: 'Error fetching notes'})
            })
    })

    .post((req, res) => {
        const { title, body, user } = req.body;
        const newNote = new Note({title, body, user})

        if(!title) {
            res.status(400).json({ error: 'Please provide a title for the note'})
        }
        if(!body) {
            res.status(400).json({ error: 'Please provide content for the note'})
        }

        newNote.save()
            .then(newNote => {
                res.status(201).json(newNote)
            })
            .catch(err => {
                res.status(500).json({ error: 'Error saving note to the database'})
            });
    });

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        if(id.length !== 24) {
            res.status(400).json({ error: 'A note id must contain 24 characters'})
        }

        Note.findById(id)
            .then(note => {
                if(note) {
                    res.json(note)
                } else {
                    res.status(404).json({ error: `Note with id ${id} does not exist in the database`})
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Error fetching note'})
            })
    })

    .put((req, res) => {
        const { id } = req.params;
        if(id.length !== 24) {
            res.status(400).json({ error: 'A note id must contain 24 characters'})
        }

        const { title, body } = req.body;
        if(!title) {
            res.status(400).json({ error: 'Please provide a title for the note'})
        }
        if(!body) {
            res.status(400).json({ error: 'Please provide content for the note'})
        }

        Note.findByIdAndUpdate(id, { title, body }, {new: true})
            .then(note => {
                if(!note) {
                    res.status(400).json({ error: `Note with id ${id} does not exist`})
                } else {
                    res.json(note);
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'The note could not be updated'})
            })
    })

    .delete((req, res) => {
        const { id } = req.params;

        Note.findByIdAndRemove(id)
            .then(deletedNote => {
                if(!deletedNote) {
                    res.status(404).json({ error: `Note with id ${id} does not exist`})
                    return;
                } else {
                    res.status(204).json(deletedNote)
                }  
            })
            .catch(err => {
                res.status(500).json({ error: 'The note could be deleted'})
            })

    })
    
    






module.exports = router;