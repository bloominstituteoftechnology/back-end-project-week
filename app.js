const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());


mongoose
  .connect('mongodb://jaivon:massena890@ds237700.mlab.com:37700/lambdanotesdb')
  .then(mongo =>{ console.log('connected to database')}
  )
  .catch(err => {
    console.log('Error connecting to database', err)
  })
