//dependencies
const express = require('express');
const chalkAnimation = require('chalk-animation');

//initialize the server
const server = express();



//middleware



//next();



//routes

server.get('/', (req, res) => {
  res.json({ api: 'Api is working correctly, Raymond Rosario || Kevin Jolley can you read this?' });
});



//dynamic port binding
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  chalkAnimation.rainbow(`The server is running on port ${PORT}`);
});
