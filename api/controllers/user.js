const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;
const STATUS_SERVER_ERROR = 500;

const sendUserError = (error, res) => {
  res.status(STATUS_SERVER_ERROR);
  if(error && error.message) {
    res.json({ message: error.message, stack: error.stack });
  } else {
    res.json({ error: error });
  }
};

const createUser = (req, res) => {
  const { username, password } = req.body;

  if(!username || !password) {
    res.status(STATUS_USER_ERROR).json('Please provide both username and password');
  } else {
    const newUser = new User({ username, password: password });
    newUser.save((error, savedUser) => {
      if (error) {
        return sendUserError(error, res);
      } else {
        res.status(STATUS_SUCCESS).json(savedUser);
      }
    });
  }
};

module.exports = {
  createUser
};