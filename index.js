// Import node modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();// creates the server

// Add GLOBAL MIDDLEWARE
server.use(helmet());
server.use(express.json());
server.use(cors());

//Add home route
server.get('/', (req, res) => {
  res.send('Server is up and running!');
});

server.listen(9900, () => console.log('\n====running on port 9900====\n'));