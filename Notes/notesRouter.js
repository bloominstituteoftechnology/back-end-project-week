const express = require('express');
const todo = require('./notesModel.js');
const router = express.Router();

router
.get('/', (req, res) => {

todo
.find()
.populate('user', {_id: 0, __v: 0})
.then(todos => {
    res.status(200)
    res.json({ todos })
})
.catch(error => {
    res.status(500)
    res.json({ message: "Error in fetching Notes" })
})
})

router
.get('/ViewNote/:id', (req, res) => {
const { id } = req.params;

todo
.findById(id)
.then(todo => {
    res.status(200)
    res.json({ todo })
})
.catch(error => {
    res.status(500)
    res.json({ message: "Error in finding note"})
})
})

router
.post('/CreateNewNote', (req, res) => {
const { title, content } = req.body;
const newtodo = new todo({ title, content });

if(!title || !content) {
    res.status(400)
    res.json({ message: "Title or Content information missing" })
}
else { 
newtodo
.save()
.then(todo => {
    res.status(200)
    res.json({ todo })
})
.catch(error => {
    res.status(500)
    res.json({ message: "Error in creating new Note" })
})
}})


router
.delete('/:id', (req, res) => {
const { id } = req.params;

todo
.findByIdAndRemove(id)
.then(todo => {
    res.status(200)
    res.json({ todo })
})
.catch( err => {
    res.status(500)
    res.json({ message: "Error in deleting Note" })
})
})


module.exports = router