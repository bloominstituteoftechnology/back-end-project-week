const express = require('express');
const server = express();

const Note = require('../models/notes-model');

server.use(express.json());

