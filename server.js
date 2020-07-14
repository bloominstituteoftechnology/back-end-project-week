// https://github.com/LambdaSchool/back-end-project-week/pull/343

const express = require('express');
const cors = require('cors');
const knex = require('knex');
const helmet = require('helmet');
const db = require('./dbConfig.js');
const morgan = require('morgan');
const notesRoutes = require('./notes/notesRoutes.js');
require('dotenv').config();

const PORT = process.env.PORT || 8888;

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan());
app.use(express.json());

app.use('/notes', notesRoutes);

app.listen(9000, console.log(`Listening on port ${PORT}`)
);