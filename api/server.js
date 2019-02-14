const express = require('express');

const notes = require('../notes/notesModel');
const tags = require("../notes/tagsModel");

const server = express();

server.use(express.json());



module.exports = server;
