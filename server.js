const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose
.connect('mongodb://localhost/')
.then(mongo => {
  console.log('connected to mongo-mini database');
})
.catch(err => {
  console.log('error connecting to database', err);
})

// const bearController = require('./bears/bearController');


const server = express();
server.use(cors({}));
server.use(express.json());


server.get('/', function(req, res) {
    res.status(200).json({ api: 'running' });
  });
  
//   server.use('/api/bears', bearController);
  
  const port = process.env.PORT || 5000;
  server.listen(port, () => {
    console.log(`\n=== API running on http://localhost:${port} ===\n`);
  });
  