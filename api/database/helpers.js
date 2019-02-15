const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  getAllNotes,
  insertNote,
  insertUser,
  findNote,
  updateNote,
  deleteNote
};

function getAllNotes(res) {
  return db("notes");
}

function insertNote(note) {
  return db("notes").insert(note);
}

function insertUser(user) {
  return db("users").insert(user);
}

function findNote(id) {
  return db("notes")
    .where({ id })
    .first();
}

function updateNote(id, note) {
  return db("notes")
    .where("id", id)
    .update(note);
}

function deleteNote(id) {
  return db("notes")
    .where("id", id)
    .del();
}

