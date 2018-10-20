const jwt = require('jsonwebtoken');

const Task = require('../../database/models/TaskModel');
const User = require('../../database/models/UserModel');
const {
  clientError: { notFound },
  serverError
} = require('../../http_status_codes');

const { JWT_SECRET } = process.env;

const taskDelete = async (req, res) => {
  const { id } = req.params;
  const { token } = req.body;

  try {
    const { username } = jwt.verify(token, JWT_SECRET);
    const user = await User.find({ username });
  
    if (user) {
      const deletedTask = await Task.findByIdAndDelete(id);
      
      if (deletedTask)
        return res.json(deletedTask);

      return res.status(notFound).json({
        status: notFound,
        statusMessage: 'Could not find the appropriate task to delete'
      });
    }
    
    return res.status(notFound).json({
      status: notFound,
      statusMessage: 'No user found with that name'
    });
  }
  catch (err) {
    console.log(err);

    res.status(serverError).json({
      status: serverError,
      statusMessage: 'Server error while trying to delete your task'
    });
  }
};

module.exports = taskDelete;