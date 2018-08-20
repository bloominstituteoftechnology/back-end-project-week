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

server.get('/notes/:id', (req, res) => {
  const {id} = req.params

  // Create a array of IDs
  notes.map(cv => cv.id).includes(Number(id)) ?
  
  // If it contains the ID return:
  res.status(200).json(notes[id]) : 
  
  // Otherwise return:
  res.status(404).json({msg:'ID not found'})
  
})

module.exports = server