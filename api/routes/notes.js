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
module.exports = server