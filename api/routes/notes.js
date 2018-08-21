const server = require('express')()
const db = require('../../data/db')


server.get('/', (req,res) => {
    res.status(200).json("App is currently running (better go out and catch it!)")
})

server.get('/get/all', (req,res,next) => {
    db('notes')
        .select('*')
        .then(notes => {
            notes.forEach(note => note.tags = note.tags ? note.tags.split(',').map(tag => tag.trim()) : [])
            res.status(200).json(notes)
        })
        .catch(next)
})

server.get('/get/:id', (req,res,next) => {
    const { id } = req.params

    if(!id){
        res.status(404).json("ID Not found")
    }
    db('notes')
        .select('*')
        .where({id})
        .first()
        .then(note => {
            if(!note){
                res.status(404).json({error: true, message: "No note with that ID"})
            }else{
                if(note.tags) note.tags = note.tags.split(',').map(tag => tag.trim())
                res.status(200).json(note)
            }
            
        })
        .catch(next)
})

server.post('/post', (req,res,next) => {
    const newNote = req.body

    if(!newNote.title || !newNote.textBody){
        res.status(418).json({error: true, message: "Missing title or textBody"})
    }
    if(newNote.tags){
        newNote.tags = newNote.tags.join(',')
    }

    db('notes')
        .insert(newNote)
        .into('notes')
        .then(id => {
            res.status(200).json({ inserted_id: id, inserted: newNote })
        })
        .catch(next)
})

server.delete('/delete/:id', (req,res,next) => {
    const { id } = req.params

    db('notes')
        .where({id})
        .del()
        .then(id => {
            res.status(200).json({ deleted_id: id })
        })
        .catch(next)
})

server.put('/edit/:id', (req,res,next) => {
    const { id } = req.params
    const updated = req.body

    updated.tags = updated.tags.join(',')

    db('notes')
        .where({id})
        .update(updated)
        .then(response => {
            res.status(200).json({response})
        })
})

module.exports = server