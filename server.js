const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const userRouter = require('./users/userRoutes');
const noteRouter = require('./notes/noteRoutes');
const { authenticate } = require('./utils/middleware');

app.use(express.json());
app.use(helmet());
app.use(cors());
// app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('Working');
});

app.use('/user', userRouter);
app.use('/notes', authenticate, noteRouter);

mongoose
  .connect('mongodb://localhost/lambdanotes')
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Running on port: ${port}`));
  })
  .catch(err => {
    console.log('error connecting to database');
  });
