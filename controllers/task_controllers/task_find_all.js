const jwt = require('jsonwebtoken');

const Task = require('../../database/models/TaskModel');
const User = require('../../database/models/UserModel');
const { 
  successful: { noContent },
  clientError: { badRequest }
} = require('../../http_status_codes');

const { JWT_SECRET } = process.env;

const taskFindAll = async (req, res) => {
  const { token } = req.body;

  try {
    // first tests if the JWT is valid if not then catch
    const { username } = jwt.verify(token, JWT_SECRET);
    const { _id: userId } = await User.findOne({ username });
    const task = await Task.find({ userId });

    if (task.length === 0)
      return res.status(noContent).json({
        status: noContent,
        statusMessage: 'It appears as if you do not have any tasks'
      });
    
    res.json(task);
  }
  catch (err) {
    res.status(badRequest).json({
      err,
      status: badRequest,
      statusMessage: 'The JWT provided has either expired or has been tampered with an is now invalid. Consider logging out and back in.'
    });
  }
};

module.exports = taskFindAll;