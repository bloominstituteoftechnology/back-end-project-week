const axios = require("axios");
const bcrypt = require("bcryptjs");

const db = require("../database/dbConfig");

const { autheticate, generateToken } = require("../auth/authenticate");

const PORT = process.env.PORT || 3000;

module.exports = server => { };

// MVP Endpoints

/**
 * GET NOTES ENDPOINT
 *
 * Display a list of notes created by the user.
 *
 * @param {Object} req - Information returned from HTTP request
 * @param {Object} res - HTTP response
 */
function getNotes(req, res) {
    db("notes")
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            res.status(500).json({ message: "Could not get any notes." }, err);
        });
}