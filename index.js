const express = require('express'); 
const knex = require('knex'); 

const server = express(); 
server.use(express.json()); 

server.get("/", (req, res) => {
    res.status(200).json({message: "This worked!"})
})


server.listen(9000, () => console.log("Server listening at Port 9000")); 