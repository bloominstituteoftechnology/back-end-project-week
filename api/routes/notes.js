const server = require('express')()
const db = require('../../data/db')


server.get('/', (req, res) => {
    res.status(200).json("App is currently running (better go out and catch it!)")
})

server.get('/get/all', (req,res, next) => {
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
            res.status(200).json(note)
        })
        .catch(next)
})
module.exports = server