const router = require('express').Router();

const Note = require('./notesModel');

const User = require('./userModel');

router
    .route('/')
    .get(get)
    .post(post)

router
    .route('/:id')
    .get(getid)
    .put(putid)
    .delete(deleteid)





module.exports = router;