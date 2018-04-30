const router = require('express').Router();
const User = require('./userModel');
const router = express.Router();

router
  .route('/')
  .get( (req, res) => {
    User.find({}).then(users => {
      res.status(200).json(users);

    })
    .catch(err => {
      res.status(500).json(err);
    });
  })

  .post( (req, res) => {
    const user = new User(req.body);

    bear
    .save().then(savedUser=>{
      res.status(201).json(savedUser);
    })
    .catch(err => res.status(500).json(err));
    
  });


  module.exports = router;