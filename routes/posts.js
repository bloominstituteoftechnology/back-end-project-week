const express = require("express");
const router = express.Router();
const passport = require("passport");

const Post = require("../models/Post");
const User = require("../models/User");

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
  const { title, content} = req.body;
  const currentUserId = req.user.id;
  Post.create({title, content, user: currentUserId})
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    })
})

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({msg: "Can't find by that ID"});
    })
})

router.delete("/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
  const { id } = req.params;
  const currentUserId = req.user.id;
  console.log("currentUser : ", req.user);
  console.log("id params", id);
  Post.findById(id)
    .then(post => {
      console.log("post that you get back", post);
      if(post.user.toString() !== currentUserId) {
        return res.status(400).json({msg: "This is not your post so you can't delete this post"});
      }
      post.remove()
        .then(deletedPost => {
          res.json(deletedPost);
        })
        .catch(err => {
          res.status(500).json({msg: err.message});
        })
    })
    .catch(err => {
      console.log("current user id " ,currentUserId);
      //console.log()
      res.status(500).json({msg: err.message});
    })
})

router.put("/:id", passport.authenticate("jwt", {session: false}), (req,res) => {
  const { title, content} = req.body;
  const { id } = req.params;
  const currentUserId = req.user.id;
  Post.findById(id)
    .then(post => {
      if(post.user.toString() !== currentUserId) {
        return res.status(400).json({msg: "This is not your post so you can't update this post"});
      }
      post.update({title, content})
        .then(updatedPost => {
          res.json(updatedPost);
        })
        .catch(err => {
          res.status(400).json({msg: err.message});
        })
    })
    .catch(err => {
      res.status(500).json({msg: err.message});
    })
})

module.exports = router;