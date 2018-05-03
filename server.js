const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// ========== ROUTES ========== //

const setupRoutes = require('./setup/routes')(app);

// ========== MIDDLEWARE ============== //

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

mongoose
  .connect(
    'mongodb://pacManKana:LambdaN0t3s@ds111050.mlab.com:11050/lambda-notes'
  )
  .then(cnn => {
    console.log('\n=== connected to mLab mongo ===\n');
  })
  .catch(err => {
    console.log('\n=== ERROR connecting to mongo ===\n');
  });



app.listen(PORT);
