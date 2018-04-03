const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;
const STATUS_SERVER_ERROR = 500;


