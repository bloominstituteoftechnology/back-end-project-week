const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();
const mongoose = require("mongoose");
const routes = require("./routes");

const db = process.env.MONGOLAB_URI || 'mongodb://localhost/notes';
mongoose
  .connect(db)
  .then(() => console.log('\n=== connected to mongo ===\n'))
  .catch(err => console.log('database is not connected'));

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());

server.use("/", routes);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
