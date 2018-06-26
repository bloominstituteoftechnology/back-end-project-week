const express = require('express');
const Note = require('./userModel.js');
const router = express.Router();


router
.get('/', (req, res) => {

Note
.find()
.populate('notes', {_id: 0, __v: 0})
.then(users => {
    res.status(200)
    res.json({ users })
})
.catch(error => {
    res.status(500)
    res.json({ message: "Error in fetching Users" })
})
})


module.exports = router