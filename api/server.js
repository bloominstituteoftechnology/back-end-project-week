const express = require('express');

const server = express();

server.use(express.json());
// require('dotenv').config();

// const videogamesRoutes = require('../videogames/videogamesroutes.js');

//sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

//Videogame Methods
// server.get('/api', videogamesRoutes);
// server.get('/api/games', videogamesRoutes);
// server.post('/api/games', videogamesRoutes);

module.exports = server;
