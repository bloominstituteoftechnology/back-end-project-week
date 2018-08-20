const express = require('express');
const cors = require('cors');
const db = require('./data/db');
const server = express();

server.use(express.json());
server.use(cors({origin: 'http://localhost:3000', credentials:true}));

server.get('/', (req, res) => {
  res.send('Running....');
});



server.listen(8000, () => {
  console.log('API running on port 8000')
});