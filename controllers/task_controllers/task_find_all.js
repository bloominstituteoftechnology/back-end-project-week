const Task = require('../../database/models/TaskModel');
const { successful: { noContent } } = require('../../http_status_codes');

const taskFindAll = (req, res) => {
  Task.find()
    .then(task => {
      if (task.length === 0)
        return res.status(noContent).json({
          status: noContent,
          statusMessage: 'You have no tasks'
        });
      
      res.json(task);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = taskFindAll;