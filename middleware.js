const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      req.jwtPayload = decodedToken;
      if (err) {
        return res
          .status(401)
          .json({ message: "Invalid token.  Please log in again." });
      }

      next();
    });
  } else {
    res.status(401).json({ message: "Please log in first." });
  }
};

const getMiddleware = goose => {
  return (req, res, next) => {
    if (req.params.id) req.getResult = goose.findById(req.params.id);
    else req.getResult = goose.find();
    next();
  };
};

const postMiddleware = goose => {
  return (req, res, next) => {
    if (req.params.id)
      res.status(400).json({ errorMessage: "Cannot post to specific ID" });
    else {
      const postGoose = new goose(req.saneBody);
      postGoose
        .save()
        .then(postedGoose => {
          req.postResult = postedGoose;
          next();
        })
        .catch(error => {
          res.status(500).json({ error: error });
        });
    }
  };
};

const putMiddleware = goose => {
  return (req, res, next) => {
    if (!req.params.id)
      res.status(400).json({ errorMessage: "Please specify an ID in the url" });
    else {
      goose
        .findByIdAndUpdate(req.params.id, req.saneBody)
        .then(editedGoose => {
          if (editedGoose) {
            req.putResult = editedGoose;
            next();
          } else res.status(422).json({ error: "No such document found" });
        })
        .catch(error =>
          res.status(500).json({ error: "Error editing document" })
        );
    }
  };
};

const deleteMiddleware = goose => {
  return (req, res, next) => {
    if (!req.params.id)
      res.status(400).json({ errorMessage: "Please specify an ID in the url" });
    else {
      goose
        .findByIdAndDelete(req.params.id)
        .then(deletedGoose => {
          if (deletedGoose) {
            req.deleteResult = deletedGoose;
            next();
          } else res.status(422).json({ error: "No such document found" });
        })
        .catch(error =>
          res.status(500).json({ error: "Error deleting document" })
        );
    }
  };
};

//middleware to sanitize the body
const sanitizeMiddleware = type => {
  return (req, res, next) => {
    switch (type) {
      case "note":
        const note = ({ title, textBody } = req.body);
        if (note.title === undefined || note.textBody === undefined) {
          res
            .status(400)
            .json({ errorMessage: "Please provide a title and text body." });
        }
        req.saneBody = note;
        break;
      case "user":
        const user = ({ username, password } = req.body);
        if (user.username === undefined || user.password === undefined) {
          res
            .status(400)
            .json({ errorMessage: "Please provide a username and password." });
        }
        req.saneBody = user;
        break;
      default:
        res.status(500).json({
          errorMessage:
            "The sanitization middleware was given a type it doesn't understand!"
        });
    }

    next();
  };
};

module.exports = {
  sanitizeMiddleware: sanitizeMiddleware,
  getMiddleware: getMiddleware,
  postMiddleware: postMiddleware,
  putMiddleware: putMiddleware,
  deleteMiddleware: deleteMiddleware,
  authMiddleware: authMiddleware
};
