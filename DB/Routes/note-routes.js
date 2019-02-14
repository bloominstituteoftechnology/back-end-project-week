const express = require('express')
const router = express.router()
const noteDB = require('../DB-Functions/Note-Functions')


router.get('/', (req, res) => {
 noteDB.pull()
  .then()
  .catch(() => {
   
  })
})

router.get('/:id', (req, res) => {
 noteDB.pullById()
  .then()
  .catch(() => {
   
  })
})

router.post('/', (req, res) => {
 noteDB.place()
  .then()
  .catch(() => {
   
  })
})

router.put('/:id', (req, res) => {
 noteDB.alter()
  .then()
  .catch(() => {
   
  })
})

router.delete('/:id', (req, res) => {
 noteDB.clear()
  .then()
  .catch(() => {
   
  })
})

module.exports.router