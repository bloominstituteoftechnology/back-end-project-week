// Packages
const express = require('express');

module.exports = (notesModel) => {
  // Dependencies
  const noteRoutes = require('./controllers/noteRoutes')(notesModel);
  const noteIdRoutes = require('./controllers/noteIdRoutes')(notesModel);
  const useGeneralMiddleware = require('./utils/server/middleware');
  // Definitions
  const server = express();

  useGeneralMiddleware(server);

  server.route('/')
    .get((req, res) => {
      res.status(200).json({ message: "API is running!" });
    });

  server.route('/notes')
    .get(noteRoutes.GET)
    .post(noteRoutes.POST)
    .put(noteRoutes.NO_PUT);

  server.route('/notes/:id')
    .get(noteIdRoutes.GET_ONE_BY_ID)
    .put(noteIdRoutes.PUT)
    .delete(noteIdRoutes.DELETE);
  
  return server;
};

