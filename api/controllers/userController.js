const UserModel = require('../models/userModel');

const createUser = (req, res) => {
    const note = new UserModel(req.body);
    note.save()
        .then(user => res.status(201).send(user))
        .catch(err => {
            res.status(500).send({error: "Something went wrong saving your user information", info: err});
        });
};

const getUsers = (req, res) => {
    UserModel.find({})
        .populate()
        .exec((err, resp) => res.status(200).send(resp));
};

module.exports = {createUser, getUsers};