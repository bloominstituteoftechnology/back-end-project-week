require('dotenv').config();


const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../users/UserModel');
// const config = require('../config');
const bcrypt = require('bcrypt');


// const secret = config.secret;

function generateToken(user) {
    const options = {
        expiresIn: '1y',
    };
    const payload = { name: user.username };
    return jwt.sign(payload, process.env.jwtSecret, options); //returns the token
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
            .populate("notes", "-user")
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
    bcrypt.hash(password, 10)
            .then(hash => {
                User.create({ username, password: hash})
                    .then(({ username }) => {
                        const token = generateToken({ username });
                        res.status(201).json({ username, token });
                    })
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => {
                console.log({ error: err })
            });
    const newUser =  new User;
    
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




module.exports = router;
