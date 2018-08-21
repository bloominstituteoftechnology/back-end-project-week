const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

router
    .route('/')
    .post((req, res) => {
        const newUser = {email, password} = req.body;
        User.create(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(e => {
            res.status(400).json(e)})
    })
    .get((req, res) => {
        User.find().then(response => {
            res.status(200).json({response})
        })
        .catch(e =>{
            res.status(400).json({errorMessage: 'could not fetch user'})
        })
    })
router
    .route('/:id')
    .get((req, res) => {
        const {id} = req.params;
        User.findById(id).then(foundUser => {
            console.log(foundUser)
            if(foundUser === null){
                res.status(404).json({errorMessage: 'sorry not User for you..'})
                return;
            }
            res.status(200).json(foundUser)
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'no user in the db'})
        });
    })
    .delete((req, res) => {
        const {id} = req.params;
        User.findByIdAndRemove(id)
        .then(destroyUser => {
            console.log(destroyUser)
            if(destroyUser === null){
                res.status(404).json({errorMessage: "Are you sure this is your email?"});
                return;
            }
            res.status(200).json({success: 'This user cease to exist', resource: destroyUser})
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'no User to destory'})
         });
    })
    .put((req, res) => {
        const {id} = req.params;
        const updated = ({email, password} = req.body);
        User.findByIdAndUpdate(id, updated, {new: true})
        .then(updatedUser => {
            if(updatedUser === null){
                res.status.json({errorMessage: "No User to update with that id"})
                return;
            }
            res.status(200).json({success: "User updated like new", resource: updatedTodo})
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'No User in the system to update'})
        });
    });

    
    function createToken(user){
        const options = {
          expires: '30mins'
        };
        const payload = {name: user.username};
      
        return jwt.sign(payload, secret, options);
      }
      
      const secret = "there is nothing to fear, but fear itself";
      
  
    router.post('/login', (req, res) => {
        const {email, password} = req.body;
          User.findOne({email})
          .then(user => {
            if(user){
              bcrypt.compare(password, user.password)
                .then(matchPw => {
                  console.log(matchPw);
                  if(matchPw){
                    const {username} = user
                    const token = createToken(user)
                    res.status(200).json({username, token})
                 }else {
                    res.status(401).json({error: "wrong pw"})
                  }
                })
                .catch(err => {
                  res.status(404).json({error: "please try again."})
                })
            }
          })
          .catch(err => {
            res.status(500).json({error: err.message})
        })
      })
    


module.exports = router;