const express = require('express');
const server = express();
const postRoutes = require('./api/post');

server.use(express.json())
server.use('/api/post', postRoutes);



const port = 5000;
server.listen(port, () => {console.log('API running')});