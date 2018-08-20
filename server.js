const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('App is running');
})

server.get('/notes', (req, res) => {
  res.status(200).send('Notes should be returned from here')
})

server.listen(8000, () => console.log('App is listening...'));
