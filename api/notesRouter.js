const codes = require("./../data/statusCodes");

const express = require("express");
const db = require("../data/db");
const router = express.Router();

router.get("/", (req, res, next) => {
  db("notes")
    .then(response => {
      res.status(codes.OK).json(response);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  db("notes")
    .insert(req.body)
    .then(response => {
      res.status(codes.CREATED).json(response);
    })
    .catch(err => {
      next(err);
    });
});

      res.status(codes.OK).json(response);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;
