const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const userRouter = require('./users/userRoutes');
const noteRouter = require('./notes/noteRoutes');

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Working');
});

app.use('/user', userRouter);
app.use('/notes', noteRouter);

mongoose
  .connect('mongodb://localhost/lambdanotes')
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Running on port: ${port}`));
  })
  .catch(err => {
    console.log('error connecting to database');
  });
