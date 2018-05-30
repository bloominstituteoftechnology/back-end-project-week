const express = require('express'); 

const server = express(); 

server.use(cors({})); 
server.use(express.json()); 
const port =  process.env.PORT || 33333 

server.get('/', (req, res) => {
    res.json({message: 'hello'})
})


server.listen(port, (err) => {
    if(err) console.log(err);

    console.log('connected to ' + port);
})