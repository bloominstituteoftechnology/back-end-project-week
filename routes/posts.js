const express = require("express");
const router = express.Router();
const passport = require("passport");

const Post = require("../models/Post");
const User = require("../models/User");

router.get("/all", passport.authenticate("jwt", {session: false}),(req, res) => {
  const currentUserId = req.user.id;
  const currentUserName = req.user.username;
  Post.find()
    // get by latest
    // .populate("user")
    .sort({date: -1 })
    .then(posts => {
      let mainPost = [];
      //console.log(posts);
      let allPosts = posts;
      // get all public posts
      let public = allPosts.filter(post => {
        return post.public === true;
      })
      //console.log("public post",public);
      mainPost = mainPost.concat(public);
      // get all friends posts
      let friendspost = allPosts.filter(post => {
        return post.friends === true; 
      })
      console.log("friends post", friendspost);
      // get all private post
      let privatePost = allPosts.filter(post => {
        return post.private == true;
      })
      //console.log("private post", privatePost)
      // bring in current user's friends
      User.findById(currentUserId)
        .then(currentUser => {
          let currentUserFriendsPosts = [];
          let currentUserFriends = currentUser.friends;
          for(let i = 0; i < currentUserFriends.length; i ++) {
            for(let j = 0; j < friendspost.length; j ++) {
              console.log("check type",friendspost[j].user.userID)
              if(friendspost[j].user.userID.toString() == currentUserFriends[i].user.toString()) {
                currentUserFriendsPosts.push(friendspost[j]);
              }
            }
          }
          let myPostFriend = [];
          for(let x = 0; x < friendspost.length; x ++) {
            if(friendspost[x].user.userID.toString() == currentUserId) {
              myPostFriend.push(friendspost[x]);
            }
          }

          mainPost = mainPost.concat(myPostFriend);
          //console.log("===Mypost===", myPostFriend);
          //console.log("===currentUsers Friend===",currentUserFriendsPosts);
          let currentUserPrivate = [];
          //console.log("=== private ==", privatePost);
          for(let k = 0; k < privatePost.length; k ++) {
            if(privatePost[k].user.userID.toString() == currentUserId) {
              currentUserPrivate.push(privatePost[k]);
            }
          }
          //console.log("===currentUsers private===", currentUserPrivate);
          mainPost = mainPost.concat(currentUserFriendsPosts)
          mainPost = mainPost.concat(currentUserPrivate);
          mainPost.sort(function(a, b) {
            if(a.date > b.date) {
              return -1;
            } else if(a.date < b.date) {
              return 1;
            } else {
              return 0;
            }
          })
          res.json(mainPost);
        })
      
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    })
})


router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
  
  const { title, content, public, private, friends} = req.body;
  const currentUserId = req.user.id;
  const currentUserName = req.user.username;
  //console.log(currentUserName);
  const currentUser = {
    userID: currentUserId,
    username: currentUserName
  };
  console.log("====",title, content, public, private, friends, currentUser, "====");
  Post.create({title, content, user: currentUser, public, private, friends})
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({error: err});
    })
})

// Come And make this route more strict
router.get("/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .then(post => {
      res.json(post)
    })
    .catch(err => {
      res.status(400).json({msg: "cant find by that id"});
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
      if(post.user.userID.toString() !== currentUserId) {
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
      if(post.user.userID.toString() !== currentUserId) {
        return res.status(400).json({msg: "This is not your post so you can't update this post"});
      }
      post.update({title, content})
        .then(updatedPost => {
          res.json({msg: "Update successfully"});
        })
        .catch(err => {
          res.status(400).json({msg: err.message});
        })
    })
    .catch(err => {
      res.status(500).json({msg: err.message});
    })
})

// router.get("/users/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
//   const { id } = req.params;
//   const currentUserID = req.user.id;
//   Post.find({user: {userID: id}})
//     .then(friendPosts => {
//       let filterOutPrivate = friendPosts.filter(post => {
//         return post.private !== true; 
//       })
//       User.findById(currentUserID)
//         .then(currentUser => {
//           let isFriend = false;
//           let currentUserFriends = currentUser.friends;
//           for(let i = 0; i< currentUserFriends.length; i ++) {
//             if(currentUserFriends[i].user.toString() == id) {
//               isFriend = true;
//             }
//           }
//           if(isFriend) {
//             res.json(filterOutPrivate);
//           } else {
//             let filterOutFriend = filterOutPrivate.filter(post => {
//               return post.friends !== true;
//             })
//             res.json(filterOutFriend);
//           }
//         })
//         .catch(err => {
//           res.status(400).json({error: err.message});
//         })
//         //res.json(filterOutPrivate);
//     })
//     .catch(err => {
//       res.status(500).json({error: err.message});
//     })
// })

router.post("/comment/:id", passport.authenticate("jwt", {session: false}),(req, res)=> {
  const { id } = req.params;
  const { comment } = req.body
  Post.findById(id)
    .then(post => {
      const newComment = {
        comment,
        username: req.user.username,
        user: req.user.id
      }
      post.comments.push(newComment);
      post.save()
        .then(savedPost => {
          res.json(post);
        })
        .catch(err => {
          res.status(500).json({err: err.message});
        })
    })
    .catch(err => {
      res.status(400).json({err: err.message});
    })
})

router.delete("/:id/comment/:comment_id", passport.authenticate("jwt", {session: false}), (req, res) => {
  const { id, comment_id } = req.params;
  const currentUserID = req.user.id;
  Post.findById(id)
    .then(post => {
      const removeIndex = post.comments.map(item => item._id.toString())
          .indexOf(comment_id);
        let comment = post.comments.splice(removeIndex, 1);
        console.log(comment[0].user.toString() === currentUserID);
        if(comment[0].user.toString() === currentUserID) {
          post.save()
            .then(savedpost => {
              res.json(savedpost);
            })
            .catch(err => {
              res.status(500).json({msg: "err saving"});
            })
        }  else {
            res.status(403).json({msg: "You are not authorize to delete this comment"})
        }
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    })
})


module.exports = router;