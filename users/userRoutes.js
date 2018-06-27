const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/UserModel');
const config = require('../config');

const secret = config.secret;

function generateToken(user) {
    const options = {
        expiresIn: '1h',
    };
    const payload = { name: user.username };


    return jwt.sign(payload, secret, options); //returns the token
}

router.get('/', (req, res) => {
    User.find()
        .populate("notes", "-_id -__v -user")
        .select('-password')
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
        const { id } = req.params;
        User.findById(id)
            .populate("notes", "-_id -__v -user")
            .select('-password')
            .then(foundUser => {

                if (foundUser === null) {
                    res.status(404).json({
                            error: `No user with id${id} found. Can't retrieve it!`
                        });
                    return;
                }
                res.json({ requestedUser: foundUser });
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        error: "The Uuer information could not be retrieved."
                    });
            });
    })

router.post('/register', function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "Can't submit an empty field!" });
        return;
    }
    User.create(req.body)
        .then(({ username }) => {
            const token = generateToken({ username });
            res.status(201).json({ username, token });
        })
        .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
    const { username, password } = req.body
    User.findOne({ username })
        .then(user => {
            if (user) {
                user.validatePassword(password)
                    .then(isPasswordValid => {
                        if (isPasswordValid) {
                            const { _id } = user
                            const { username } = user
                            const token = generateToken(user)
                            // req.headers.authorization = token
                            res.status(200).json({ 
                                message: `welcome ${username}!`,
                                token, 
                                userId: _id 
                            })
                        } else {
                            res.status(401).json({ error: 'Invalid credentials, check your username or password!' })
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'error processing information' })
                    })
            } else {
                res.status(401).json({ error: 'Invalid credentials, check your username or password!' })
            }
        })
})

router.get('/logout', (req, res) => {
    const token = req.headers.authorization;
    console.log(req.headers)
    if (token) {
        token.destroy(err => {
            if (err) {
                res.send('error logging out');
            } else {
                res.send('Good bye, please come back again!');
            } 
        });
    }
});



module.exports = router;
