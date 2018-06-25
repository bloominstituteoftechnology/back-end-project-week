const router = require('express').Router();
const jwt = require("jsonwebtoken");
const secret = "Wouldn't you like to know"

const Note = require('./Note');

router
    .route('/')
    .get((req, res) => {
        Note
            .find()
            .then(notes => {
                res.status(200).json(notes);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })
    .post((req, res) => {
        const { title, body } = req.body;
        Note
            .create({ title, body })
            .then(notes => {
                res.status(201).json(notes);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

// function restricted(req, res, next) {
//     const token = req.headers.authorization;
    
//     if(token){
//         jwt.verify(token, secret, (err) => {

//         if(err){
//             return res.status(401).json({ message: "Token was not decoded. Please log in with correct username and password to view notes." });
//         }
//             next();
//         });
//     } else {
//         res.status(401).json({ message: "Error: no token. Please log in." })
//     }
// }

module.exports = router;