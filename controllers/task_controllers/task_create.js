const Task = require('../../database/models/TaskModel');
const { 
  successful: { created },
  clientError: { badRequest },
  serverError
} = require('../../http_status_codes');

const taskCreate = async (req, res) => {
  const { taskName, taskDescription, jwtToken } = req.body;
  const { _id: userId } = await Task.verifyToken(jwtToken);
  const task = { userId, taskName, taskDescription };

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