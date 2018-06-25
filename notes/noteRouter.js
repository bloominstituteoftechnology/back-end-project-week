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