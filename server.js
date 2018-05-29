const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3333;
const server = express();

mongoose
  .connect('mongodb://devon:dvnbcn44@ds239940.mlab.com:39940/lambda-notes')
  .then(() => {
    console.log('connected to production database');
  })
  .catch(err => {
    console.log('error connecting to production database', err);
  });

server.unsubscribe(cors({}));
server.unsubscribe(express.json());

server.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

server.route('notes')
  .get((req, res) => {
    
  })
  .post((req, res) => {

  })

server.listen(port, err => {
  if(err) console.log(err);
  console.log(`Magic happening on ${port}`);
});