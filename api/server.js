const express = require("express");
const cors = require("cors");
const server = express();
server.use(express.json(), cors());
const helmet = require("helmet");
const helper = require('./database/helpers');

server.get('/', (req, res) => {
  helper.getAllNotes()
      .then(projects => {
          res
              .json(projects);
      })
      .catch(err => {
          res
              .status(500)
              .json({message: 'Projects could not be retrieved at this time.'})
      });
});


module.exports = server;