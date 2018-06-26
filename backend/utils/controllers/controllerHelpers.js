const httpStatusCode = require('../HTTPStatusCodes');
const validators = require('../models/modelValidators');

const validateNotePostBody = noteReqBody => {
  const { title, text, tags, author, collaborators } = noteReqBody;

  if (!author) {
    return { 
      errorState: true,
      status: httpStatusCode.badRequest,
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

const validateUserPostBody = userReqBody => {
  const { email, password } = userReqBody;

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  if (!email) {
    return { 
      errorState: true,
      status: httpStatusCode.badRequest,
      error: "400: Bad Request\nThe 'email' field is missing but is required."
    };
  } else if (!password) {
    return { 
      errorState: true,
      status: httpStatusCode.badRequest,
      error: "400: Bad Request\nThe 'password' field is missing but is required."
    };
  }

  if (!validators.email(email)) {
    return { 
      errorState: true,
      status: httpStatusCode.unprocessableEntity,
      error: "422: Unprocessable Entity\nThe value supplied for the 'email' field appears to be invalid."
    };
  }

  if (!validatePassword(password)) {
    return {
      errorState: true,
      status: httpStatusCode.unprocessableEntity,
      error: '422: Unprocessable Entity\nThe password supplied is invalid.\n\nPasswords should be a minimum of eight (8) characters.'        
    };
  } 

  return {
    email,
    password
  };
}
module.exports = {
  validateNotePostBody,
  validateUserPostBody
};