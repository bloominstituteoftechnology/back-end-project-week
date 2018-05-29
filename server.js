const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors'); 
const helmet = require('helmet');


const port = process.env.PORT || 2886; 
const server = express(); 
server.use(cors({})); 
server.use(bodyParser.json()); 
server.use(helmet());

server.get('/', (req, res) => {
    res.json({Message: "Up and at'um!"});
});

server.listen(port, err => {
    if (err) console.log(err); 
    console.log(`Happening on ${port}!`)
});
