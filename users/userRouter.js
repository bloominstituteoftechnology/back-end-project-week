const express = require('express');
const db = require('./userController.js');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  db
    .getAll()
    .then(users => {
      res.status(200).send(users);
    }).catch(err => {
      res.status(500).send({ msg: 'Error retrieving users.' });
    })
});

userRouter.post('/', (req, res) => {
  const newUser = req.body;

  if (!req.body.name) {
    res.status(400).send({ msg: 'Please include a username to add.' });
  } else {
    db
      .addUser(newUser)
      .then(id => {
        res.status(201).send(id);
      }).catch(err => {
        res.status(500).send({ msg: 'Error adding user.' });
      })
  }
});

userRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .getById(id)
    .then(user => {
      if (user.length > 0) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ msg: `UserId ${id} not found.`});
      }
    }).catch(err => {
      res.status(500).send({ msg: 'Error retrieving the user.' });
    })
});

userRouter.get('/:id/posts', (req, res) => {
  const { id } = req.params;

  db
    .getPostsByUser(id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).send(posts);
      } else {
        res.status(404).send({ msg: `No posts with userId ${id} were found.` });
      }
    }).catch(err => {
      res.status(500).send({ msg: 'Error retrieving posts.' });
    })
});

userRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  if (!updatedUser.name) {
    res.status(400).send({ msg: 'Please include the name to be updated.' });
  } else {
    db
      .updateUser(id, updatedUser)
      .then(user => {
        res.status(200).send({ msg: 'User successfully updated.' });
      }).catch(err => {
        res.status(500).send({ msg: 'Error updating user.' });
      })
  }
});

userRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .nuke(id)
    .then(count => {
      if (count > 0) {
        res.status(200).send({ msg: 'User nuked successfully.' });
      } else {
        res.status(404).send({ msg: 'User not found.' });
      }
    }).catch(err => {
      res.status(500).send({ msg: 'Error nuking the user.' });
    })
});

module.exports = userRouter;
