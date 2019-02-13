const express = require("express");
const server = express();
const db=[];
server.use(express.json());

server.get("/notes", (req, res) => {
    res.status(200).json(db)
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