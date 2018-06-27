const middleware = require("../middleware.js");
const express = require("express");
const router = express.Router();
const User = require("./User.js");

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
      res.json(req.postResult);
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
  .delete(
    middleware.authMiddleware,
    middleware.deleteMiddleware(User),
    (req, res) => {
      res.json(req.deleteResult);
    }
  );

module.exports = router;
