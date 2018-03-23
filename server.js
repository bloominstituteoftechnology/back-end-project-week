const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const userRouter = require('./users/userRoutes');
const noteRouter = require('./notes/noteRoutes');
const { authenticate } = require('./utils/middleware');
const { dbuser, dbpass } = require('./config');

app.use(express.json());
app.use(helmet());
app.use(cors());
// app.use(morgan('combined'));
app.use(express.static(path.resolve(__dirname, 'frontend/build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
});

app.use('/user', userRouter);
app.use('/notes', authenticate, noteRouter);

mongoose
  .connect(`mongodb://admin:admin@ds119449.mlab.com:19449/lambdanotes`)
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
  })
  .catch(err => {
    console.log('error connecting to database');
  });
