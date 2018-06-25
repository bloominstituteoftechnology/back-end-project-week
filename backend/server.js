// Packages
const express = require('express');

module.exports = (notesModel) => {
  // Dependencies
  const noteRoutes = require('./routes/noteRoutes');
  const useGeneralMiddleware = require('./utils/server/middleware');
  // Definitions
  const server = express();

  useGeneralMiddleware(server);

  server.route('/')
    .get((req, res) => {
      res.status(200).json({ message: "API is running!" });
    });

  server.route('/notes')
    .get(noteRoutes(notesModel).GET)
    .post(noteRoutes(notesModel).POST)
    .put(noteRoutes(notesModel).NO_PUT);

  server.route('/notes/:id')
    .get(noteRoutes(notesModel).GET_ONE_BY_ID)
    .put(noteRoutes(notesModel).PUT);
  
  return server;
};

