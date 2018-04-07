const express = require('express');

const { sendUserError } = require('../middlewares');

const router = express.Router();

const Note = require('../models/note-model');
const User = require('../models/users');

router.get('/', (req, res) => {
    Note.find(title)
        .then(notes => {
            res.send(notes);
        })
});