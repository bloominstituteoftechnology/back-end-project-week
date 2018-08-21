const express = require('express');
const server = express();
const cors = require('cors');
const postRoutes = require('./api/post');

server.use(express.json())
server.use(cors());
server.use('/api/post', postRoutes);



const port = 5000;
server.listen(port, () => {console.log('API running')});