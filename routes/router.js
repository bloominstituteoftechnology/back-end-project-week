const AuthController = require('../controllers/auth.controller');
const express = require('express');
const passport = require('passport');

// middleware to make login/auth required
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {

  //= =================
  // Note Routes
  //= =================
  app.route('/notes')
    .get(NoteController.getNotes);

  app.route('/new-note')
    .post(NoteController.addNote);

  app.route('/notes/:id')
    .get(NoteController.viewNote);

  app.route('/edit-note')
    .put(NoteController.editNote);

  app.route('/notes/:id')
    .delete(NoteController.deleteNote);
}