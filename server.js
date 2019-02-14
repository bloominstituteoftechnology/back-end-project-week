const express = require("express");
const server = express();
const db=[];
server.use(express.json());

server.get("/notes", (req, res) => {
  db('notes').then(id => {
    res.status(200).json(id); 
  })
  .catch(err => { res.status(500).json({err: "there was an error"})
})
  });

server.get("/notes/:id", (req, res) => {
    
});

server.post("/notes", (req, res) => {
    
});

server.put("/notes/:id", (req, res) => {
    
});

server.delete("/notes/:id", (req, res) =>{

});

module.exports = server; 