const httpStatus = require('../HTTPStatusCodes');

const validatePostBody = body => {
  const { title, text, tags, author, collaborators } = body;

  if (!author) {
    return { 
      errorState: true,
      status: httpStatus.badRequest,
      error: "400: Bad Request\nThe 'author' field is missing but is required. Ensure it is a MongoDB ObjectID type."
    };
  }

  return {
    title,
    text,
    author,
    tags,
    collaborators
  };
};

module.exports = {
  validatePostBody
};