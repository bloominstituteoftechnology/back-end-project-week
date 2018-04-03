const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const sourceMapSupport = require('source-map-support');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const todoRoutes = require('./routes/todo.server.route');
const app = express();
const bodyParser = require('body-parser');

//setting up the DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/MERN-toDo-app');

// express-busboy to parse multipart/form-data
// bb.extend(app);

//using cors
const corsOptions = {
  "origin": '*',
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}

//add source map support
sourceMapSupport.install();

//configuring the app
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const routes = require("./api/routes/routes");
routes(app);

// app.get('/', (req,res) => {
//   return res.end('API working!');
// });
app.listen( PORT, () => {
  console.log('App server listening on PORT:', PORT);
});