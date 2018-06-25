const express  = require('express');
const port = 3333;
// const users = require('./userModel');
// const notes = require('./noteModel');

const server = express();
server.use(express.json());


// sanity check 
server.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});