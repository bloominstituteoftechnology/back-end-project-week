const express = require('express');
const noteController = require('../controllers/noteController');
let appRouter = express.Router();

appRouter.route('/').get(noteController.getNotes);

module.exports = appRouter;