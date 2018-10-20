const jwt = require('jsonwebtoken');

const Task = require('../../database/models/TaskModel');
const User = require('../../database/models/UserModel');
const {
  clientError: { badRequest, notFound },
  serverError
} = require('../../http_status_codes');

const { JWT_SECRET } = process.env;

const taskUpdate = async (req, res) => {
  const { id } = req.params;
  const task = ({ taskName, taskDescription, token } = req.body);

  try {
    const { username } = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ username });

    // find the user
    if (user) {
      const findTask = await Task.findById(id);
      // find the correct task
      if (findTask) {
        findTask.taskName = taskName || findTask.taskName;
        findTask.taskDescription = taskDescription;
        const updateTask = await findTask.save();

        // if task is updated successfully
        if (updateTask) {
          return res.json(updateTask);
        }
        return res.status(badRequest).json({
          status: badRequest,
          statusMessage: 'For some unknown reason we were unable to update your task'
        });
      }
      // if no task was found
      return res.status(notFound).json({
        status: notFound,
        statusMessage: 'Sorry, can\'t find that task in the database'
      });
    }
    // if no user is found
    return res.status(notFound).json({
      status: notFound,
      statusMessage: 'There is no account with that username'
    });
  }
  // most likely a server error
  catch (err) {
    res.status(serverError).json({
      status: serverError,
      statusMessage: 'There was an error while updating your task'
    })
  }
};

module.exports = taskUpdate;