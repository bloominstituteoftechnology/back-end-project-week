const Project = require('../models/Project');
const Task = require('../models/Task');
const Comment = require('../models/Comment');
const { sendErr } = require('../utils/apiResponses');

const isCommentAccessible = (req, res, next) => {
  // is requesint user the user on the comment?
  const commentId = req.params.id;
  const currentUser = req.tokenPayload.userid;

  Comment.findById(commentId)
    .then(comment => {
      if (comment.author.toString() === currentUser) {
        req.commentAuthor = true;
        next();
      } else {
        sendErr(res, '403', 'User is not authorized to perform this action.');
      }
    })
    .catch(err => {
      sendErr(
        res,
        err,
        `The comment with id ${commentId} could not be retrieved.`
      );
    });
};

const isProjectAdmin = (req, res, next) => {
  const projectId = req.params.id;
  const currentUser = req.tokenPayload.userid;

  Project.findById(projectId)
    .then(project => {
      req.projectAdmin = project.admin.toString() === currentUser;
      next();
    })
    .catch(err => {
      req.projectAdmin = false;
      next();
    });
};

const isProjectMember = (req, res, next) => {
  const projectId = req.body.project || req.params.id;
  const currentUser = req.tokenPayload.userid;

  Project.findById(projectId)
    .then(project => {
      req.validMember = project.isMember(currentUser);
      next();
    })
    .catch(err => {
      req.validMember = false;
      next();
    });
};

const isTaskAccessible = (req, res, next) => {
  const taskId = req.task || req.body.task || req.params.id;
  const currentUser = req.tokenPayload.userid;

  Task.findById(taskId)
    .populate('project')
    .then(task => {
      req.taskAccessible =
        task.project.members.filter(member => member.toString() === currentUser)
          .length === 1;
      next();
    })
    .catch(err => {
      sendErr(res, err, `The task with id ${taskId} could not be retrieved.`);
    });
};

module.exports = {
  isCommentAccessible: isCommentAccessible,
  isProjectAdmin: isProjectAdmin,
  isProjectMember: isProjectMember,
  isTaskAccessible: isTaskAccessible
};
