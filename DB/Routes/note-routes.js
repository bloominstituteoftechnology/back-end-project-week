const express = require('express')
const router = express.router()
const noteDB = require('../DB-Functions/Note-Functions')


router.get('/', (req, res) => {
 noteDB('notes')
  .then()
  .catch(() => {
   
  })
})

router.get('/', (req, res) => {
 noteDB('notes')
  .then()
  .catch(() => {
   
  })
})

router.post('/', (req, res) => {
 noteDB('notes')
  .then()
  .catch(() => {
   
  })
})

router.put('/', (req, res) => {
 noteDB('notes')
  .then()
  .catch(() => {
   
  })
})

router.delete('/', (req, res) => {
 noteDB('notes')
  .then()
  .catch(() => {
   
  })
})

module.exports.router