const express = require('express');
const bcrypt = require('bcrypt');
const middleWare = require('../middlewares');

const STATUS_USER_ERROR = 422;
const BCRYPT_COST = 11;

const User = require('../models/user-model');

const router = express.Router();

router.get('/', (req, res) => {
    User.find()
        .populate('Notes')
        .then(users => {
            res.status(200).send(users);
        })
        .catch(err => {
            sendUserError(err, res);
        });
});

router.post('/register', middleWare.hashedPassword, (req, res) => {
    const { username } = req.body;
    const passwordHash = req.password;
    const newUser = new User({ username, passwordHash });
    newUser.save((err, savedUser) => {
        if (err) {
            res.status(422);
            res.json({ 'Need both username/PW fields' : err.message });
            return;
        }

        res.json(savedUser);
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username) {
        middleWare.sendUserError('Please enter a valid username', res);
        return;
    }
    User.findOne({ username }, (err, user) => {
        if (err || user === null) {
            middleware.sendUserError('username not found, please register', res);
            return;
        }
        const hashedPw = user.passwordHash;
        bcrypt
            .compare(password, hashedPw)
            .then((response) => {
                if (!response) throw new Error();
                req.session.username = username;
                req.user = user;
            })
            .then(() => {
                res.json({ success: true });
            })
            .catch(error => {
                return middleWare.sendUserError(error, res);
            });
    });
});

router.post('/logout', (req, res) => {
    if (!req.session.username) {
      middleWare.sendUserError('User is not logged in', res);
      return;
    }
    req.session.username = null;
    res.json(req.session);
  });
  
router.get('/restricted/users', (req, res) => {
User.find({}, (err, users) => {
    if (err) {
    middleWare.sendUserError('500', res);
    return;
    }
    res.json(users);
});
});

router.get('/me', middleWare.loggedIn, (req, res) => {
    // Do NOT modify this route handler in any way
    res.send({ user: req.user, session: req.session });
});

module.exports = router;

