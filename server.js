const express = require('express'); 
 
const PORT = process.env.PORT || 5000 
 
const server = express(); 
 
server.get('/', (req, res) => { 
    res.send({api: 'up and running'}); 
}) 
 
server.listen(PORT)