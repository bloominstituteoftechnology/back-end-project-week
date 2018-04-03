const mongoose = require("mongoose");
const userModel = require("../models/Users");

const createUser = (req, res) => {
  const { userName, passWord } = req.body;
  const newUser = new userModel({ userName, passWord });
  newUser
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Not able to create new user" });
    });
};

const loginUser = (req, res) => {
  const { userName, passWord } = req.body;
  console.log(req.body);
  userModel 
    .findOne({userName})
    .exec()
    .then(user => {
        console.log(user);
      res.json(user);
    })
    .catch(error => {
        console.log(error);
      res.status(500).json({ message: "Not able to login user" });
    });
};

module.exports = {
  createUser,
  loginUser
};
