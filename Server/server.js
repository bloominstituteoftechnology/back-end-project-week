const express = require('express'); // remember to install your npm packages
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

// Mongo code
// const surveyRouter = require('./zServerFiles/Surveys/SurveyRouter.js');
// const questionRouter = require('./zServerFiles/Question/QuestionRouter.js');

// mongoose
//   .connect('mongodb://localhost/survey')
//   .then(() => console.log('\n=== connected to Mongo ===\n'))
//   .catch(err => console.log('error connecting to DB'));

// server.use('/api/surveys', surveyRouter);
// server.use('/api/questions', questionRouter);

server.get('/', (req, res) => res.send('API running...'));

server.get('/api/surveys/all', (req, res) => {
  // res.send(Surveys);
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
