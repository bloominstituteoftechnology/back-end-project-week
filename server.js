const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./setup/routes');

const server = express();

server.use(cors());
server.use(express());
server.use(helmet());
server.use(morgan());

mongoose
.connect('mongodb://omoniyi21:boo1603167@ds111430.mlab.com:11430/localhost5000')
.then(cnn => {
    console.log('\n=== connected to mongo ===\n');
})
.catch(err => {
    console.log('\n=== not connected to mongo\n', err);
})

server.get('/', function (req,res){
    res.send({api: 'up'});
});

routes(server)

server.listen(process.env.PORT || 5000, () => console.log('\n=== API on port 5k ===\n'));