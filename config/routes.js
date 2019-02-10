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

/**
 * GET NOTES BY ID ENDPOINT
 *
 * Display a specific note created by the user.
 *
 * @param {Object} req - Information returned from HTTP request
 * @param {Object} res - HTTP response
 */
function getNotesById(req, res) {
    const noteId = req.params.id;

    db("notes")
        .where("id", noteId)
        .then(note => {
            if (note.length) {
                res.status(200).json(note);
            } else {
                res
                    .status(404)
                    .json({ message: `Could not find note with id ${noteId}` });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Could not get note.", err });
        });
}

/**
 * CREATE NOTE ENDPOINT
 *
 * Create a note with title and content.
 *
 * @param {Object} req - Information returned from HTTP request
 * @param {Object} res - HTTP response
 */
function createNote(req, res) {
    const note = req.body;

    db.insert(note)
        .into("notes")
        .then(note => {
            res.status(201).json(note);
        })
        .catch(err => {
            res.status(500).json({ message: "Error creating a new note.", err });
        });
}

/**
* EDIT NOTE ENDPOINT
*
* Edit an existing note.
*
* @param {Object} req - Information returned from HTTP request
* @param {Object} res - HTTP response
*/
function editNote(req, res) {
    const updates = req.body;
    const { id } = req.params;

    db("notes")
        .where({ id })
        .update(updates)
        .then(count => {
            res.status(200).json(`${count} note in the database was updated.`);
        })
        .catch(err => {
            res.status(500).json({ message: "Error editing note." }, err);
        });
}

/**
 * DELETE NOTE ENDPOINT
 *
 * Delete an existing note.
 *
 * @param {Object} req - Information returned from HTTP request
 * @param {Object} res - HTTP response
 */
function deleteNote(req, res) {
    const { id } = req.params;

    db("notes")
        .where({ id })
        .del()
        .then(count => {
            res.status(200).json(`${count} note was deleted from the database.`);
        })
        .catch(err => {
            res.status(500).json({ message: "Error deleting note." }, err);
        });
}