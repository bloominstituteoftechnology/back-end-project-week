const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const server = express();
server.use(express.json());