const jwt = require('jsonwebtoken');

const User = require('../../database/models/UserModel');
const Task = require('../../database/models/TaskModel');
const {
  successful: { success }
} = require('../../http_status_codes');

const  { JWT_SECRET } = process.env;

const userFind = (req, res) => {
  const { id } = req.params || req.body;

  try {
    const { username } = jwt.verify(id, JWT_SECRET);

    User.findOne({ username })
      .then(user => {
        return res.json({
          status: success,
          statusMessage: 'Success',
          user: user.username
        });
      })
      .catch(err => {
        console.log(err);
        return res.json(err);
      });
  }
  catch (err) {
    User.findById(id)
      .then(user => {
        Task.find({ userId: id })
          .then(tasks => {
            user.tasks = tasks;
            res.json(user);
          })
          .catch(err => {
            console.log(err);
            res.json(err);
          });
      })
      .catch(err => {
        res.json(err);
      });
  }
};

module.exports = userFind;