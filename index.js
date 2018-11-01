const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const server = express();
 
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/', routes);

 
const port = 7700;

 server.listen(port, () => console.log(`\n=Connected to ${port}=`));