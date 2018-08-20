const server = require('express')()
const db = require('../../data/db')


server.get('/', (req,res) => {
    res.status(200).json("App is currently running (better go out and catch it!)")
})

server.get('/get/all', (req,res,next) => {
    db('notes')
        .select('*')
        .then(notes => {
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
        .select('id', 'title', 'textBody')
        .where({id})
        .first()
        .then(note => {
            if(!note){
                res.status(404).json({error: true, message: "No note with that ID"})
            }else{
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

module.exports = server