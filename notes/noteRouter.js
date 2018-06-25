const middleware = require("../middleware.js");
const express = require("express");
const router = express.Router();
const Note = require("./Note.js");

router
  .route(["/", "/:id"])
  .get(middleware.getMiddleware(Note), (req, res) => {
    req.getResult.then(notes => {
      if (notes) res.json({ notes });
      else res.status(404).json({ errorMessage: "No documents found" });
    });
  })
  .post(
    middleware.sanitizeMiddleware("note"),
    middleware.postMiddleware(Note),
    (req, res) => {
      res.json(req.postResult);
    }
  )
  .put(
    middleware.sanitizeMiddleware("note"),
    middleware.putMiddleware(Note),
    (req, res) => {
      res.json(req.putResult);
    }
  )
  .delete(middleware.deleteMiddleware(Note), (req, res) => {
    res.json(req.deleteResult);
  });

module.exports = router;
