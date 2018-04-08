const express = require('express');
const noteController = require('../controllers/noteController');
let appRouter = express.Router();
const jwt = require('../service/auth');


// EndPoint: /api/note/

appRouter.route('/').get(noteController.getNotes);

appRouter.route('/').post(jwt.validateToken, noteController.createNote);

module.exports = appRouter;