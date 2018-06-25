// Packages
const express = require('express');

module.exports = (notesModel) => {
  // Dependencies
  const noteRoutes = require('./routes/noteRoutes');
  // Definitions
  const server = express();

  server
    .route('/')
    .get((req, res) => {
      res.status(200).json({ message: "API is running!" });
    })

  server
    .route('/notes')
    .get(noteRoutes(notesModel).GET);

  return server;
};

