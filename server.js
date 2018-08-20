const express = require('express');
const cors = require('cors');
const axios = require('axios');

const db = require('./data/db');

// const configureRoutes = require('./config/routes');

const server = express();
const corsOptions = {
  // do this later
};

server.use(express.json());
server.use(cors());

// configureRoutes(server);

server.get('/', (req, res) => {
  res.status(200).json({ hello: "world", project: "back-end-project" });
})

server.get('/notes', (req, res) => {
  
  db('notes')
    .then(notes => {
      res.status(200).json({notes});
    })

  // axios
  //   .get(
      
  //   )
  //   .then(response => {
  //     res.status(200).json(response.data);
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: 'Error getting notes.', error: err});
  //   })

})

// GET | Return stored notes

// server.get('/notes', (req, res) => {
//   res.status
// })

const port = process.env.PORT || 8888;
server.listen(port, () => console.log(`Node-Express API running on ${port}. . .`));