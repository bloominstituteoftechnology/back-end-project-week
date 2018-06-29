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
              res.json({login: "successfully", token: "Bearer " + token, username, id});
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

router.get("/friends/all", passport.authenticate("jwt", {session: false}), (req, res) => {
  const currentUserID = req.user.id;
  User.findById(currentUserID)
    // .populate("user.friends")
    // .exec()
    .then(currentUser => {
      res.json(currentUser);
    })
    .catch(err => {
      res.status(400).json({msg: "can't find user"});
    })
})

router.get("/request/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
  const { id } = req.params;
  const currentUserID = req.user.id;
  const currentUserName = req.user.username;
  console.log(currentUserName);
  User.findById(id)
    .then(user => {
      if(!user) {
        return res.status(400).json({msg: "Can't find that user"}).catch(err => {
          res.json({error: "something was not rite"});
        })
      }
      let isUserExist = false;
      for(let i = 0; i < user.friendsRequest.length; i ++) {
        if(user.friendsRequest[i].user.toString() == currentUserID) {
          isUserExist = true;
        }
      }
      for(let j = 0; j < user.friends.length; j ++) {
        if(user.friends[j].user.toString() == currentUserID) {
          isUserExist = true;
        }
      }
      console.log(isUserExist);
      if(isUserExist) {
        res.status(500).json({msg: "You are already a friend or still pending"});
      } else {
        user.friendsRequest.push({user: currentUserID, username: currentUserName});
        user.save()
          .then(saveUser => {
            res.json(saveUser);
          })
          .catch(err => {
            res.status(500).json({msg: "Can't save user"});
          })
        
      }
    })
    .catch(err => {
      res.status(500).json({msg: "Something went wrong"});
    })
})

router.delete("/request/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
  const { id } = req.params;
  const currentUserID = req.user.id;
  User.findById(currentUserID)
    .then(currentUser => {
      let foundUserIndex;
      for(let i = 0; i < currentUser.friendsRequest.length; i ++) {
        if(currentUser.friendsRequest[i].user.toString() === id.toString()) {
          foundUserIndex = i;
        }
      }
      if(foundUserIndex >= 0) {
        currentUser.friendsRequest.splice(foundUserIndex, 1);
        currentUser.save()
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            res.status(400).json({error: err.message});
          })
      } else {
        res.status(400).json({msg: "Can't find the user"});
      }
    })
    .catch(err => {
      res.status(500).json({err: err.message});
    })
})

router.post("/accept/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
  const { id } = req.params;
  const currentUserID = req.user.id;
  const currentUserName = req.user.username;
  User.findById(currentUserID)
    .then(currentUser => {
      let foundUserIndex;
      for(let i = 0; i < currentUser.friendsRequest.length; i ++) {
        if(currentUser.friendsRequest[i].user.toString() === id.toString()) {
          foundUserIndex = i;
        }
      }
      if(foundUserIndex >= 0) {
          let acceptedFriend = currentUser.friendsRequest.splice(foundUserIndex, 1);
          console.log(acceptedFriend);
          currentUser.friends.push(acceptedFriend[0]);
          currentUser.save()
            .then(savedFriend => {
              User.findById(id)
                .then(newFriend => {
                  newFriend.friends.push({user: currentUserID, username: currentUserName});
                  newFriend.save()
                    .then(friend => {
                      res.json(friend);
                    })
                    .catch(err => {
                      res.status(500).json({msg: "can't add friend"});
                    })
                })
              res.json(savedFriend);
            })
            .catch(err => {
              res.status(500).json({msg: "Error accepting friend"});
            })
      } else {
        res.status(404).json({msg: "can't find that user"})
      }
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    })
})

router.delete("/friends/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
  const currentUserID  = req.user.id;
  const { id } = req.params;
  User.findById(currentUserID)
    .then(currentUser => {
      let foundUserIndex;
      for(let i = 0; i < currentUser.friends.length; i ++) {
        if(currentUser.friends[i].user.toString() === id.toString()) {
          foundUserIndex = i;
        }
      }
      if(foundUserIndex >= 0) {
        currentUser.friends.splice(foundUserIndex, 1);
        currentUser.save()
          .then(user => {
            User.findById(id)
              .then(deletedFriend => {
                let foundUserIndex;
                for(let i = 0; i < deletedFriend.friends.length; i ++) {
                  if(deletedFriend.friends[i].user.toString() === currentUserID) {
                    foundUserIndex = i;
                  }
                }
                if(foundUserIndex >= 0) {
                  deletedFriend.friends.splice(foundUserIndex, 1);
                  deletedFriend.save()
                  .then(unfriend => {
                    res.json(unfriend);
                  })
                  .catch(err => {
                    res.json({msg: "can't delete friend"});
                  })
                }
              })
              .catch(err => {
                res.status(500).json({msg: "can't find friend"});
              })
          })
          .catch(err => {
            res.status(400).json({error: err.message});
          })
      } else {
        res.status(400).json({msg: "Can't find the user"});
      }
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    })
})


module.exports = router;