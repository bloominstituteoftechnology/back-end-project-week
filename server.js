//We bring the server 
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

//Instantiate Server
const server = express();

//Bringin Mongoose Database
const mongoose = require("mongoose");

//Bringing the route
const routes = require("./routes");

//Database name
const db = process.env.MONGOLAB_URI || 'mongodb://localhost/notes';

//Connect Database
mongoose
  .connect(db)
  .then(() => console.log('\n=== connected to mongo ===\n'))
  .catch(err => console.log('database is not connected'));

//Security
server.use(helmet())

//Permissions
server.use(cors());

//Enable to parse Json object
server.use(express.json());
//server.use(bodyParser.json()); //express.jason

//Connect the route to the server
server.use("/", routes);

//Status server
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
