const express = require('express');
const router = express.Router();
const User = require('./usersModel.js');
const { makeToken } = require('./makeTokenMWR.js')
const authenticate = require('./authTokenMWR.js')

router.get('/', authenticate, (req, res) => {
  User
    .find({})
    .then(p => {
      res.status(200).json({ users: p })
    })
    .catch(err => {
      res.status(500).json({ msg: err })
    })
})

router.post('/', (req, res) => {
  const newUser = new User(req.body)
  newUser
    .save()
    .then(p => {
      const token = makeToken(p)
      res.status(200).json({ msg: 'user  posted successfully', p, token })
    })
    .catch(err => {
      res.status(200).json({ msg: '... not able to post your user' })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const obj = req.body

  User
    .findByIdAndUpdate(id, obj, { new: true })
    .then(p => {
      res.status(200).json({ msg: '...user  updated successfully', p })
    })
    .catch(err => {
      res.status(500).json({ msg: '... not able to update your user', err })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;

  User
    .findById(id)
    .then(p => {
      res.status(200).json({ msg: '...user successfully found', p })
    })
    .catch(err => {
      res.status(200).json({ msg: '... not able to find  your note' })
    })
})
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  User
    .findById(id).remove()
    .then(p => {
      res.status(200).json({ msg: '...user successfully deleted' })
    })
    .catch(err => {
      res.status(200).json({ msg: '... not able to  delete user' })
    })
})




module.exports = router;
