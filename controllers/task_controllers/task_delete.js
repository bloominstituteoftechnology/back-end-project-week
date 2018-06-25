const Task = require('../../database/models/TaskModel');
const {
  clientError: { notFound },
  serverError
} = require('../../http_status_codes');

const taskDelete = async (req, res) => {
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id);

  if (deletedTask === null)
    return res.status(notFound).json({
      status: notFound,
      statusMessage: 'There is no task by that ID'
    });

  res.json(deletedTask);
  
    // .then(task => {
    //   if (task === null)
    //     return res.status(notFound).json({
    //       status: notFound,
    //       statusMessage: 'There is no task by that ID'
    //     })
      
    //   res.json(task);
    // })
    // .catch(err => {
    //   res.status(serverError).json(err);
    // });
};

module.exports = taskDelete;