const express = require('express');

const Users = require('../../models/Users.model');

const { RouterFactory } = require('express-router-factory');

const router = express.Router();

const RF = new RouterFactory(router, Users);

//

// Create all CRUD endpoints.
RF.CRUD();

module.exports = router;
