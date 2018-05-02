const express = require ('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const cors = require('cors');
const mongoose =require('mongoose');

//const userRouter = require('./userRouter.js');

mongoose.connect(process.env.MONGO_URI).then(() =>
  console.log('\n===connected to mongo===\n'))

.catch(err =>console.log('not connected'));


const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.get('/', function (req, res) {
  res.send({api: 'running...' });
});




const port = process.env.port || 5000;
server.listen(port, () =>console.log('server listening at port 5000'));
