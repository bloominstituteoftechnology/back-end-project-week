const axios = require('axios');
const bcrypt = require('bcryptjs');
const { authenticate, generateToken } = require('../auth/authenticate');
const express = require('express');
const router = express.Router();
