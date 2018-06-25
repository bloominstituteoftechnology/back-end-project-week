const Task = require('../../database/models/TaskModel');
const {
  clientError: { notFound },
  serverError
} = require('../../http_status_codes');

const taskFind = (req, res) => {
  const { id } = req.params;

  Task.findById(id)
    .then(task => {
      if (task === null)
        return res.status(notFound).json({
          status: `${ notFound } Not Found`,
          statusMessage: 'There is no task with that ID'
        });
      
      res.json(task);
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = taskFind;