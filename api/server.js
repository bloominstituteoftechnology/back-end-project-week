
const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');

const port = process.env.PORT || 3030;
const server = express();



mongoose
  .connect("mongodb://localhost/lambdaNotes")
  .then(db => {
    console.log("Now connected to database");
  })
  .catch(err => {
    console.log(`There was an error connecting to database ${err}`);
  });


server.use(express.json());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(session({
  secret: 'e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re',
  resave: true,
  saveUninitialized: true,
}));

const routes = require("./routes/routes");
routes(server);

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
