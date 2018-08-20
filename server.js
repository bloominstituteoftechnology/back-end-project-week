const express = require('express')
const baseTbl = require('./data/baseTbl')

const server = express()

server.use(express.json())

const statusCodePass = 200
const statusCodeFail = 404
const statusCodeInc = 422
const statusCodeNA = 405

server.get('/', (req, res) => {
  res.status(200).json({msg: 'It works!'})
})

server.get('/notes', async (req,res) => {
  try{
    const data = await baseTbl.get('notes')    
    res.status(statusCodePass).json(data)
  }
  catch(err) {res.status(statusCodeFail).json(err)}

})

server.get('/notes/:id', async (req, res) => {
  const {id} = req.params

  try{
    const data = await baseTbl.get('notes', id)
    
    data.length <= 0 ?
    res.status(statusCodeFail).json({msg:'ID not found'}) :
    res.status(statusCodePass).json(data)
    
  }
  catch(err) {res.status(statusCodeFail).json({err})}
  
})

server.post('/notes', async (req,res) =>{
  const {body} = req

  //Check if both the content and title sent
  if (!body.title || !body.content)
    res.status(statusCodeInc).json({msg: 'required fields missing'})
  else{
    try{
      const id = await baseTbl.insert('notes', body)
      const data = await baseTbl.get('notes', id[0])      
      res.status(statusCodePass).json(data[0])
      
    }
    catch(err) {
      console.log(err)
      res.status(statusCodeFail).json(err)
    }
  }

})

module.exports = server