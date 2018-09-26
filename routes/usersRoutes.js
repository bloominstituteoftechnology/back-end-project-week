const express = require('express');
const helper = require('../data/usersHelper.js');

const router = express.Router();

router.route('/').get(async (req, res, next) => {
  try {
    const users = await helper.getUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router
  .route('/:id')
  .get(async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await helper.getUser(id);
      const user = result[0];
      user ? res.status(200).json(user) : next({ statusCode: 404 });
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    const { id } = req.params;
    try {
      const count = await helper.deleteUser(id);
      count > 0
        ? res.status(200).json({ message: 'user successfully deleted.' })
        : next({ statusCode: 404 });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
