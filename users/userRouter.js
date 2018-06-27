const middleware = require("../middleware.js");
const express = require("express");
const router = express.Router();
const User = require("./User.js");
const jwt = require("jsonwebtoken");

const generateToken = username => {
  const options = {
    expiresIn: "1h"
  };
  const payload = { username };
  return jwt.sign(payload, process.env.SECRET, options);
};

router
  .route(["/", "/:id"])
  .get(
    middleware.authMiddleware,
    middleware.getMiddleware(User),
    (req, res) => {
      req.getResult.then(users => {
        if (users) res.json({ users });
        else res.status(404).json({ errorMessage: "No documents found" });
      });
    }
  )
  .post(
    middleware.sanitizeMiddleware("user"),
    middleware.postMiddleware(User),
    (req, res) => {
      const token = generateToken(req.postResult.username);
      res.json({ message: `Welcome, ${req.postResult.username}!`, token });
    }
  )
  .put(
    middleware.authMiddleware,
    middleware.sanitizeMiddleware("user"),
    middleware.putMiddleware(User),
    (req, res) => {
      res.json(req.putResult);
    }
  )
<<<<<<< HEAD
  .delete(
    middleware.authMiddleware,
    middleware.deleteMiddleware(User),
    (req, res) => {
      res.json(req.deleteResult);
    }
  );
=======
  .delete(middleware.deleteMiddleware(User), (req, res) => {
    res.json(req.deleteResult);
  });
>>>>>>> 7c3552da35b87c0d0b57139662bc633dd1fa9b64

module.exports = router;
