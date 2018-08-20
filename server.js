const express = require('express')

const server = express()

server.use(express.json())

const notes = [
 {id:0, title :'Title0', content:'Content0'},
 {id:1, title :'Title1', content:'Content1'},
 {id:2, title :'Title2', content:'Content2'},
 {id:3, title :'Title3', content:'Content3'},
]

server.get('/', (req, res) => {
  res.status(200).json({msg: 'It works!'})
})

server.get('/notes', (req,res) => {
  res.status(200).json([
    {id:0, title :'Title0', content:'Content0'},
    {id:1, title :'Title1', content:'Content1'},
    {id:2, title :'Title2', content:'Content2'},
    {id:3, title :'Title3', content:'Content3'},
   ])
})
module.exports = server