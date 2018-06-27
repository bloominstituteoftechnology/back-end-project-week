const User = require('../../database/models/UserModel');
const Task = require('../../database/models/TaskModel');

const userFind = (req, res) => {
  const { id } = req.params;
  
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
};

module.exports = userFind;