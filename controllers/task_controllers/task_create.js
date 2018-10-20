const jwt = require('jsonwebtoken');

const Task = require('../../database/models/TaskModel');
const User = require('../../database/models/UserModel');
const { 
  successful: { created },
  clientError: { badRequest },
  serverError
} = require('../../http_status_codes');

const { JWT_SECRET } = process.env;

const taskCreate = async (req, res) => {
  const { taskName, taskDescription, token } = req.body;

  try {
    const { username } = jwt.verify(token, JWT_SECRET);
    const { _id: userId } = await User.findOne({ username });
    const taskData = { taskName, taskDescription, userId };
    const task = await Task.create(taskData);
  
    console.log(task);
    res.status(created).json(task);
  }
  catch (err) {
    console.log(err);
    res.json(err);
  }
};

module.exports = taskCreate;