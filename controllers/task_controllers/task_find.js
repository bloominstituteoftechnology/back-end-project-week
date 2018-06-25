const Task = require('../../database/models/TaskModel');
const { notFound } = require('../../http_status_codes');

const taskFind = (req, res) => {
  Task.find()
    .then(task => {
      if (task.length === 0)
        return res.status(notFound).json({ message: 'You have no tasks' });
      
      res.json(task);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = taskFind;