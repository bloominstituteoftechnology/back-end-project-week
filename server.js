const express = require("express");
const server = express();
const db=[];
server.use(express.json());

server.get("/notes", (req, res) => {
  db('notes').then(notes => {
    res.status(200).json(notes); 
  })
  .catch(err => { res.status(500).json({err: "there was an error"})
})
  });

server.get("/notes/:id", (req, res) => {

  const {id} = req.params
  db('notes').where({id}).then(id => {
    res.status(201).json(id); 
  })
  .catch(err => { res.status(500).json({err: "there was an error"})
})
});
    


server.post("/notes", (req, res) => {

  const content = req.body
  db('notes').insert(content).then( id => {
    res.status(200).json(id)
  })
  .catch(err => { res.status(500).json({err: "there was an error"})
})
    
});

server.put("/notes/:id", (req, res) => {
    
});

server.delete("/notes/:id", (req, res) =>{

});

module.exports = server; 