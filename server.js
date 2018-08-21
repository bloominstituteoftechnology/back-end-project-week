const express = require('express')
const cors = require('cors')
const baseTbl = require('./data/baseTbl')

const server = express()

server.use(cors())
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

  //Check if both the textBody and title sent
  if (!body.title || !body.textBody)
    res.status(statusCodeInc).json({msg: 'required fields missing'})
  else{
    try{

      //Since the body is valid, we can insert the body
      const id = await baseTbl.insert('notes', body)

      //Then get the record for the newly returned id
      const data = await baseTbl.get('notes', id[0]) 
      
      //Pass the data back to the client
      res.status(statusCodePass).json(data[0])
      
    }
    catch(err) {
      console.log(err)
      res.status(statusCodeFail).json(err)
    }
  }

})

server.post('/notes/:id', async (req,res) => {
  const {id} = req.params
  const {body} = req

  try{

    //Check if the ID is valid
    const data = await baseTbl.get('notes', id)
    
    // if not, pass an error
    if (data.length <= 0) res.status(statusCodeFail).json({msg:'ID not found'})
    
    // if it's valid...
    else {

      // update that ID record
      const data = await baseTbl.update('notes', id, body)
      
      //If it updates successfully...
      if (data >= 1){

        //Grab that record:
        const data = await baseTbl.get('notes', id)

        //Send it back
        res.status(statusCodePass).json(data[0])
      }
    }
    
  }
  catch(err) {res.status(statusCodeFail).json({err})} 
})

server.delete('/notes/:id', async (req,res) => {
  const {id} = req.params

  try{

    //Check if the ID is valid
    const data = await baseTbl.get('notes', id)
    
    // if not, pass an error
    if (data.length <= 0) res.status(statusCodeFail).json({msg:'ID not found'})
    
    // if it's valid...
    else {

      // delete the record for that ID
      const data = await baseTbl.delete('notes', id)
      
      //If it deletes successfully...
      if (data >= 1){

        //Send it back
        res.status(statusCodePass).json({msg: "Your record has been deleted"})
      }
    }
    
  }
  catch(err) {res.status(statusCodeFail).json({err})} 

})

// server.listen('4000', () => {
//   console.log('==== API Is RUnning on port 4000 ====')
// })

module.exports = server