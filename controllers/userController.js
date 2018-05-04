const mongoose = require('mongoose');
const User = require('../models/user');

const register = (request, response) => {
    const { username, password } = request.body;

    if(!username.trim() || !password.trim()) {
        response.status(400).send({
            errorMessage: "Missing username or password."
        })
    }

    const user = new User({username, password});
    user.save()
        .then(savedUser => {
            response.status(200).send(savedUser);
        })
        .catch(err => {
            response.status(500).send({
                errorMessage: "Error occurred while saving: " + err
            });
        });
};

module.exports = {
    register
};