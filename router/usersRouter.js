const express = require('express');
const usersDB = require('../data/helpers/usersDB');
const notesDB = require('../data/helpers/notesDB');
const { userConstraints } = require('../middleware');
// const bcrypt = require('bcryptjs');
// const { jwtRoute, generateToken } = require('./middleware/jwt');
const router = express.Router();

// get all users
router.get('/', async (req, res) => {
  try {
    const users = await usersDB.get();
    if (users.length === 0) {
      res.status(200).json({ message: 'There are currently no users' });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// get a user by id, show all their notes
router.get('/:id', async (req, res) => {
  const ID = req.params.id;

  // make sure we have a user
  try {
    const user = await usersDB.get(ID);
    if (typeof user === 'undefined') {
      res.status(400).json({ message: `There is no user with id:${ID}` });
    } else {
      // we do, so get the notes
      try {
        const notes = await notesDB.getByUser(ID);
        if (notes.length > 0) {
          displayObj = notes;
        } else {
          displayObj = [];
        }
        res.status(200).json(displayObj);
      } catch (err) {
        res.status(500).send(`${err}`);
      }
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// update a user
router.put('/:id', userConstraints, async (req, res) => {
  const ID = req.params.id;
  // middleware sets the req
  const { USERNAME, PASSWORD } = req;

  const USER = { username: USERNAME, description: PASSWORD };

  // make sure we have the user to update
  try {
    const user = await usersDB.get(ID);
    if (typeof user === 'undefined') {
      res.status(400).json({ message: `There is no user with id:${ID}` });
    } else {
      // we do! try to update the user
      try {
        const user = await usersDB.update(ID, USER);
        res.status(200).json({ message: `user id:${ID} has been updated.` });
      } catch (err) {
        res.status(500).send(`${err}`);
      }
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// delete a user
router.delete('/:id', async (req, res) => {
  const ID = req.params.id;

  // make sure we have the user to delete
  try {
    const user = await usersDB.get(ID);
    if (typeof user === 'undefined') {
      res.status(400).json({ message: `There is no user with id:${ID}` });
    } else {
      // we do! try to delete the user
      try {
        const user = await usersDB.remove(ID);
        res.status(200).json({ message: `User id:${ID} has been deleted.` });
      } catch (err) {
        res.status(500).send(`${err}`);
      }
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

module.exports = router;
