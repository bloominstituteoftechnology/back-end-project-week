const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();
const cors = require('cors');
const db = require('knex')(require('./knexfile').development);

module.exports = server;