const functions = require('firebase-functions');
const cors = require('cors');
const express = require('express');
const router = require('./router');

const corsOptions = {
  origin: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET','POST','PUT','DELETE'],
  optionsSuccessStatus: 200
};

const server = express();
server.use(cors(corsOptions));
server.use('/notes', router);

exports.app = functions.https.onRequest(server);