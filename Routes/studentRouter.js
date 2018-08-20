const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Student = require('../Models/studentModel');

const secret = "freezing trap";

function generateToken(student) {
    const options = {
        expiresIn: '24h',
    };
    const payload = { name: student.username };
    return jwt.sign(payload, secret, options)
}

function restricted(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({
                    message: 'Token not Generated'
                })
            }
            next();
        })
    } else {
        res.status(401).json({
            message: 'No Token'
        })
    }
}

router.get('/users', restricted, (req, res) => {
    Student
        .find({})
        .select('-password -_id -__v')
        .then(students => {
            res.status(200).json({
                students: students
            })
        })
        .catch(error => {
            res.status(500).json({ 
                message: error.message 
            });
        });
})

router.post('/register', function(req, res) {
    const student = {
        username: req.body.username,
        password: req.body.password,
    }
    Student 
        .create(student)
        .then(newStudent => {
            const token = generateToken(student)
            res.status(201).json(newStudent)
        })
        .catch(error => {
            res.status(500).json({ 
                message: error.message 
            });
        });
})

router.post('/login', function(req, res) {
    const { username, password } = req.body;
    Student
        .findOne({ username })
        .then(student => {
            if(!student) {
                res.status(401).json({
                    message: "INVALID CREDENTIALS"
                })
            } else {
                student
                    .validatePassword(password)
                    .then(passwordsMatch => {
                        if(passwordsMatch) {
                            const token = generateToken(student)
                            req.header.authorization = token;
                            res.status(200).json({
                                message: `Welcome ${username}`, 
                                token
                            })
                        } else {
                            res.status(401).json({
                                message: "INVALID CREDENTIALS"
                            })
                        }
                    })
                    .catch(error => {
                        res.status(500).json("Error Comparing Passwords")
                    })
            }
        })
        .catch(error => {
            res.status(500).error({
                error: error.message
            })
        })
})

module.exports = router;
