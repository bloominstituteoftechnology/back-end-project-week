const middleware = require("../middleware.js");
const express = require("express");
const router = express.Router();
const Note = require("./Note.js");

router
  .route(["/", "/:id"])
  .get(
    middleware.authMiddleware,
    middleware.getMiddleware(Note),
    (req, res) => {
      req.getResult.then(notes => {
        if (!Array.isArray(notes)) notes = [notes];
        console.log(notes);
        console.log(req.jwtPayload.username);
        notes = notes.filter(note => {
          console.log(note + " compared to " + req.jwtPayload.username);
          return (
            note.owner === req.jwtPayload.username ||
            req.jwtPayload.username === "root"
          );
        });
        res.json({ notes });
      });
    }
  )
  .post(
    middleware.authMiddleware,
    middleware.sanitizeMiddleware("note"),
    middleware.postMiddleware(Note),
    (req, res) => {
      res.json(req.postResult);
    }
  )
  .put(
    middleware.authMiddleware,
    middleware.ownerMiddleware(Note),
    middleware.sanitizeMiddleware("note"),
    middleware.putMiddleware(Note),
    (req, res) => {
      res.json(req.putResult);
    }
  )
  .delete(
    middleware.authMiddleware,
    middleware.ownerMiddleware(Note),
    middleware.deleteMiddleware(Note),
    (req, res) => {
      res.json(req.deleteResult);
    }
  );

module.exports = router;
