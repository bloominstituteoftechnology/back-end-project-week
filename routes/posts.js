const express = require("express");
const router = express.Router();
const passport = require("passport");

const Post = require("../models/Post");

router.get("/", (req, res) => {
  Post.find()
    // get by latest
    .sort({date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    })
})

router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
  const { title, content, username} = req.body;
  Post.create({title, content})
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    })
})

module.exports = router;