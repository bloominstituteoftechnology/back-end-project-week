require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const usersDb = require('../data/helpers/usersHelper.js');
const notesDb = require('../data/helpers/notesHelper.js');
const logoutDb = require('../data/helpers/logoutHelper.js');

const protected = require('../middleware/protected.js');

const router = express.Router();

// generates jwt
const generateToken = user => {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '12h',
    };

    return jwt.sign(payload, secret, options);
};

// [GET] /api/users/protectedTest
router.get('/protectedTest', protected, (req, res) => {
    res.status(418).json({ message: 'You must be logged in!' })
});

// [POST] /api/users/availableUsername
router.post('/availableUsername', async (req, res) => {
    const username = req.body.username;
    try {
        const result = await usersDb.availableUsername(username);
        res.status(200).send(result);
    } catch(err) {
        res.status(500).json({ code: 3, message: 'Error registering user' });
    }
});

// [GET] /api/users
router.get('', (req, res) => {
    usersDb.getUsers()
        .then(users => {
            if (users.length) {
                res.status(200).json(users);
            } else {
                res.status(404).json({ code: 9, message: 'No users in database' });
            }
        })
        .catch(err => {
            res.status(500).json({ code: 3, message: 'Error retrieving users' });
        });
});

// [GET] /api/users/:id
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    usersDb.getUser(userId)
        .then(user => {
            if (user.length) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ code: 4, message: 'User does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json({ code: 3, message: 'Error retrieving user' });
        })
});

// [GET] /api/users/:id/notes
router.get('/:id/notes', protected, async (req, res) => {
    const user_id = req.params.id;
    try {
        const notes = await notesDb.getNotes(user_id);

        if (notes.length) {
            res.status(200).json(notes);
        } else {
            const checkUser = await usersDb.getUser(user_id);
            if (checkUser.length) {
                res.status(200).json({ code: 1, message: 'No notes in database' });
            } else {
                res.status(404).json({ code: 4, message: 'User does not exist' });
            }
        }
    } catch (err) {
        res.status(500).json({ code: 3, message: 'Error retrieving notes' });
    };
});

// [POST] /api/users/register
router.post('/register', (req, res) => {
    const newUser = req.body;
    if (typeof newUser.username === 'string' && typeof newUser.password === 'string') {
        if (usersDb.availableUsername(newUser.username)) {
            usersDb.registerUser(newUser)
                .then(id => {
                    res.status(201).json(id);
                })
                .catch(err => {
                    if (err.code === "23505") {
                        res.status(409).json({ code: 10, message: 'Username already exists' });
                    } else {
                        res.status(500).json({ code: 3, message: 'Error registering new user'});
                    }
                })
        } else {
            res.status(409).json({ code: 10, message: 'Username already exists' })
        }
    } else {
        res.status(400).json({ code: 5, message: 'Request formatted incorrectly' });
    }
});

// [POST] /api/users/login
router.post('/login', (req, res) => {
    const creds = req.body;
    creds.username = creds.username.toLowerCase();
    console.log('creds', creds);

    usersDb.getUserByUsername(creds.username)
        .then(user => {
            console.log('user', user);
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ code: 12, message: 'Successful login', token });
            } else {
                res.status(401).json({ code: 11, message: 'Failed login' });
            }
        })
        .catch(err => {
            console.log('server err', err);
            res.status(500).json({ code: 3, message: 'Error occurred during login' });
        });
});

// [POST] /api/users/:id/newNote
router.post('/:id/newNote', protected, (req, res) => {
    const user_id = req.params.id;
    const newNote = req.body;
    let valid = true;

    // validate post request format
    Object.getOwnPropertyNames(newNote).forEach(key => {
        switch (key) {
            case 'title':
                if (typeof newNote[key] !== 'string' || newNote[key] === '') {
                    valid = false;
                };
                break;
            case 'textBody':
                if (typeof newNote[key] !== 'string') {
                    valid = false;
                };
                break;
            case 'tags':
                if (!Array.isArray(newNote[key])) {
                    valid = false;
                    break;
                } else {
                    if (!newNote[key].every(element => typeof element === 'string' || typeof element === 'number')) {
                        valid = false;
                        break;
                    };
                    newNote.tags = newNote.tags.join(',');
                    break;
                }
            default:
                break;
        }
    });

    if (valid) {
        notesDb.addNote(newNote, user_id)
            .then(id => {
                res.status(201).json(id);
            })
            .catch(err => {
                if (err.errno === 19 && err.code === 'SQLITE_CONSTRAINT') {
                    res.status(404).json({ code: 4, message: 'User not found' });
                } else {
                    res.status(500).json({ code: 3, message: 'Error creating note' });
                }
            });
    } else {
        res.status(400).json({ code: 5, message: 'Request formatted incorrectly' });
    }
});

// [POST] /api/users/logout
router.post('/logout', protected, (req, res) => {
    if (req.body.token) {
        if (typeof req.body.token === 'string') {
            const invalidToken = { invalidToken: req.body.token };
            logoutDb.invalidateToken(invalidToken)
                .then(id => {
                    if (id) {
                        res.status(200).json({ code: 15, message: 'Successful logout' })
                    };
                })
                .catch(err => {
                    if (err.errno === 19 && err.code === 'SQLITE_CONSTRAINT') {
                        res.status(404).json({ code: 16, message: 'Token already invalidated' });
                    } else {
                        res.status(500).json({ code: 3, message: 'Error logging out' });
                    }
                });
        } else {
            res.status(400).json({ code: 13, message: 'Invalid token' });
        }
    } else {
        res.status(400).json({ code: 14, message: 'No token provided' });
    }
});

module.exports = router;