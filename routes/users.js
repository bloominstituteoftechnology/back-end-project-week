const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const secretJWT = "I love programming";

const User = require("../models/User");

router.get("/", (req, res) => {
  res.json({test: "testing user router"})
})

router.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  User.findOne({email})
    .then(user => {
      if(user) {
        console.log("already have the email");
        return res.status(404).json({error: "Sorry already exist"});
      } else {
        const newUser = new User({username, email, password});
        bcrypt.genSalt(12, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
              console.log(err);
            } else {
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  res.json(user);
                })
                .catch(err => {
                  res.status(500).json(err);
                })
            }
          })
        })
      }
    })
})

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            const { id, username, email } = user;
            const payload = {id, username, email};
          
            jwt.sign(payload, secretJWT, { expiresIn: 10000}, (err, token) => {
              res.json({login: "successfully", token: "Bearer " + token});
            })
          }
        })
        .catch(err => {
          res.status(400).json({error: err.message});
        })
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    })
})

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { id, username, email, friends, friendsRequest } = req.user;
  res.json({ id, username, email, friends, friendsRequest });

});

router.get("/request/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
  const { id } = req.params;
  const currentUserID = req.user.id;
  User.findById(id)
    .then(user => {
      if(!user) {
        return res.status(400).json({msg: "Can't find that user"})
      }
      user.friendsRequest.push({user: currentUserID});
      user.save()
        .then(saveUser => {
          res.json(saveUser);
        })
        .catch(err => {
          res.status(500).json({msg: "Can't save user"});
        })
    })
    .catch(err => {
      res.status(500).json({msg: err.message});
    })
})

router.post("/accept/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
  const { id } = req.params;
  const currentUserID = req.user.id;
  User.findById(currentUserID)
    .then(user => {
      console.log("current user: ", user.friendsRequest);
      let foundUserIndex;
      for(let i = 0; i < user.friendsRequest.length; i ++) {
        if(user.friendsRequest[i].user.toString() === id.toString()) {
          foundUserIndex = i;
        }
      }
      if(foundUserIndex >= 0) {
        console.log("Array, CoreMongoose",foundUserIndex);
        let moveFriend = user.friendsRequest.splice(foundUserIndex, 1);
        console.log(moveFriend[0]);
        user.save(function(err, friend) {
          User.findById(currentUserID)
            .then(currentUser => {
              currentUser.friends.push({user: id});
              currentUser.save()
                .then(savedFriend => {
                  res.json(savedFriend);
                })
                .catch(err => {
                  res.status(500).json({msg: "Error accepting friend"});
                })
            })
            .catch(err => {
              res.status(500).json({msg: "Can't find user"});
            })
        })
      }
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    })
})


module.exports = router;