const Task = require('../../database/models/TaskModel');
const { 
  successful: { created },
  clientError: { badRequest },
  serverError
} = require('../../http_status_codes');

const taskCreate = (req, res) => {
  const task = ({ taskName, taskDescription } = req.body);
  
  Task.create(task)
    .then(task => {
      res.status(created).json(task);
    })
    .catch(err => {
      if (!taskName)
        res.status(badRequest).json({
          status: badRequest,
          statusMessage: 'Please provide a task name'
        });
      
      res.status(serverError).json(err);
    });
};

module.exports = taskCreate;