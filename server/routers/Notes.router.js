const express = require('express');

const Notes = require('../../models/Notes.model');

const { RouterFactory } = require('express-router-factory');

const router = express.Router();

const RF = new RouterFactory(router, Notes);

// Set Population
RF.setPopulate({ users: { __v: 0, notes: 0, password: 0 } });

RF.GET('/', sendUserNotes);

// Create all CRUD endpoints.
RF.CRUD();

module.exports = router;

/**
 * ROUTER HANDLERS: handle endpoints
 */
function sendUserNotes(req, res, next) {
  const { token, decodedToken } = req;
  const user_id = decodedToken._id;
  console.log(user_id);
  // Notes.find({ users: { $elemMatch: { _id: user_id } } })
  Notes.find({ users: user_id })
    .then(notes => {
      console.log('notes', notes);
      res.status(200).json(notes);
    })
    .catch(e => {
      console.log('error', e);
      res.status(500).json('Ups, something bad retriving data from the DB, try again!');
    });
}
