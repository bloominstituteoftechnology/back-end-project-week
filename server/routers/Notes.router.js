const express = require('express');

const Notes = require('../../models/Notes.model');

const RouterFactory = require('../../myTools/RouterFactory');

const router = express.Router();

const RF = new RouterFactory(router, Notes);

// Create all CRUD endpoints.
RF.CRUD();

module.exports = router;
