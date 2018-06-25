const Task = require('../../database/models/TaskModel');

const taskDelete = (req, res) => {
  const { id } = req.params;

  Task.findByIdAndDelete(id)
    .then(task => {
      res.json(task);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = taskDelete;