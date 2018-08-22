// middleware for users constraints
function userConstraints(req, res, next) {
  const USERNAME = req.body.username;
  const CLEARPASSWORD = req.body.password;

  if (!USERNAME || USERNAME.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'username'.`,
    });
  }

  if (USERNAME.length > 128) {
    return next({
      code: 400,
      error: `The 'username' must be fewer than 128 characters.`,
    });
  }

  if (!CLEARPASSWORD || CLEARPASSWORD.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'password' for the user.`,
    });
  }

  if (CLEARPASSWORD.length > 128) {
    return next({
      code: 400,
      error: `The 'password' must be fewer than 128 characters.`,
    });
  }

  // set the req object
  req.USERNAME = USERNAME.toLowerCase();
  req.CLEARPASSWORD = CLEARPASSWORD;

  next();
}

function loginConstraints(req, res, next) {
  const USERNAME = req.body.username;
  const CLEARPASSWORD = req.body.password;

  if (!USERNAME || USERNAME.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'username'.`,
    });
  }

  if (!CLEARPASSWORD || CLEARPASSWORD.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'password' for the user.`,
    });
  }

  // set the req object
  req.USERNAME = USERNAME.toLowerCase();
  req.CLEARPASSWORD = CLEARPASSWORD;

  next();
}

function noteConstraints(req, res, next) {
  const TITLE = req.body.title;
  const CONTENT = req.body.content;

  if (!TITLE || TITLE.length < 1) {
    return next({
      code: 400,
      error: `Please provide a 'title' for the note.`,
    });
  }

  if (!CONTENT || CONTENT.length < 1) {
    return next({
      code: 400,
      error: `Please provide 'content' for the note.`,
    });
  }

  // set the req object
  req.TITLE = TITLE;
  req.CONTENT = CONTENT;

  next();
}

module.exports.userConstraints = userConstraints;
module.exports.noteConstraints = noteConstraints;
module.exports.loginConstraints = loginConstraints;
