const express = require('express');
const logger = require('morgan');
const mongoose = require('monogoose');
// const todoRoutes = require('./routes/todo.server.route');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const routes = require('./routes')
const app = express('mongodb://localhost/MERN-toDo-app');

//setting up the DB
mongoose.Promise = global.Promise;
mongoose.connect()

// express-busboy to parse multipart/form-data
// bb.extend(app);

//using cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

//configuring the app
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', routes); // also written as routes(app);
app.get('/', (req,res) => {
  return res.end('API working!')
});
app.listen( PORT, () => {
  console.log('App server listening on PORT:', PORT);
});