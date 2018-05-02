const User = require('../models/userModel');

const logout = (req, res) => {
    req.sessions.destroy(err => {
        res.json(err);
    })
    res.status(200).json({ msg: "Successfully Logged Out." });
}

module.exports = {
    logout
};