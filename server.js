const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://boaz:wasruthless@ds139970.mlab.com:39970/my-bible-app')
  .then(mongo => {
    console.log('connected to database');
  })
  .catch(err => {
    console.log('Error connecting to the database', err);
  });


const server = express();
server.use(cors({}));
server.use(bodyParser.json());
server.use(express.json());

server.use('/notes', noteController);

server.get('/', (req, res) => {
  res.json({ Message: 'Hello World' });
});

const port = process.env.PORT || 3333;
server.listen(port, err => {
  if(err) console.log(err);
  console.log(`API connected on ${port}`);
})