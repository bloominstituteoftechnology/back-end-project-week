const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
  getAllNotes,
  insertNote
}

function getAllNotes(res){
 return db('notes');
}

function insertNote(note){
  return db('notes').insert(note)
}

