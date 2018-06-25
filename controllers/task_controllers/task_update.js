const Task = require('../../database/models/TaskModel');

const taskUpdate = (req, res) => {
  const { id } = req.params;
  const task = ({ taskName, taskDescription } = req.body);

  Task.findById(id)
    .then(task => {
      task.taskName = taskName || task.taskName;
      task.taskDescription = taskDescription;

      task.save()
        .then(task => {
          res.json(task);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = taskUpdate;