const server = require('express')()
const db = require('../../data/db')


server.get('/', (req, res) => {
    res.status(200).json("App is currently running (better go out and catch it")
})


module.exports = server