const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const Keys = require('../config/keys');
const User = require('../modules/users');

const router = express.Router();

