const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
const userRouter = require('./users/userRoutes');

app.use(express.json());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Working');
});

app.use('/user', userRouter);

mongoose
  .connect('mongodb://localhost/lambdanotes')
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Running on port: ${port}`));
  })
  .catch(err => {
    console.log('error connecting to database');
  });
