const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors'); 
const helmet = require('helmet');
const config = require("./config.js");
const mongoose = require("mongoose");


const port = process.env.PORT || 2886; 
const server = express(); 

const noteController = require("./controllers/noteController");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb://${config.username}:${
      config.password
    }@ds239930.mlab.com:39930/users_notes`
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch(err => {
    console.log("error connecting to db");
  });

server.use(cors({})); 
server.use(bodyParser.json()); 
server.use(helmet());
server.use("/api/notes", noteController);

server.get('/', (req, res) => {
    res.json({Message: "Up and at'um!"});
});

server.listen(port, err => {
    if (err) console.log(err); 
    console.log(`Happening on ${port}!`)
});
