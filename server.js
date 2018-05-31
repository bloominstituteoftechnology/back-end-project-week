require('dotenv').config();
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const Sentiment = require('sentiment');
const language = require('@google-cloud/language');

const Note = require('./models/note');

server.use(express.json());
server.use(cors());
server.use(helmet());

const sentiment = new Sentiment();
const client = new language.LanguageServiceClient();

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 5000;
  server.listen(port, () => console.log(`\n server listening on port ${port}`));

  mongoose.connect(`mongodb://${process.env.MONGO_DB_URI}`)
    .then(mongo => console.log('connected to database'))
    .catch(err => console.log(err));
}

const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);
const errorLog = (err, req, res, next) => {
  console.log(err);
  res.status(500).json(err.message);
}

server.post('/api/notes', asyncHandler(async (req, res) => {
  const response = await Note.create(req.body)
  res.status(201).json(response);
}));

server.get('/api/notes', asyncHandler(async (req, res) => {
  const response = await Note.find()
  res.status(200).json(response);
}));

server.get('/api/notes/:id', asyncHandler(async (req, res) => {
  const response = await Note.findById(req.params.id)
    || `Note with id ${req.params.id} not found`;
  res.status(200).json(response);
}));

server.put('/api/notes/:id', asyncHandler(async (req, res) => {
  // const sentScore = sentiment.analyze(req.body.content);
  // req.body.sentiment = sentScore.score;
  // req.body.comparative = sentScore.comparative;
  // req.body.title = `Score: ${sentScore.score}, Comparative: ${sentScore.comparative}`; 

  const document = {
    content: req.body.content,
    type: 'PLAIN_TEXT'
  };

  let score = await client.analyzeSentiment({ document });
  score = score[0].documentSentiment.score;
  console.log("score is ", score);
  req.body.sentiment = score;
  req.body.title = `Score: ${score}`; 

  const response = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true})
    || `Note with id ${req.params.id} not found`;
  res.status(200).json(response);
}));

server.delete('/api/notes/:id', asyncHandler(async (req, res) => {
  const response = await Note.findByIdAndRemove(req.params.id)
    || `Note with id ${req.params.id} not found`;
  res.status(200).json({ message: `Note with id ${response._id} deleted.`});
}));

// needs to be last: https://expressjs.com/en/guide/error-handling.html
server.use(errorLog);

module.exports = server;
