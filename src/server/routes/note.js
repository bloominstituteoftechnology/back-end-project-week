const express = require('express')
const Note = require('../../models/Note')
const authenticated = require('../middleware/authenticated')

const router = express.Router()

router.use(authenticated)

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ $or: [{ author: req.user._id }, { collaborators: req.user._id }] })
    res.status(200).send({ notes })
  } catch (error) {
    res.status(500).send({ error })
  }
})

router.post('/', async (req, res) => {
  const note = await Note.create({ author: req.user._id, ...req.body })
  if (note) {
    res.status(201).send({ note })
  } else {
    res.status(500).send({ error: 'Error creating note' })
  }
})

router.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (note) {
    res.status(200).send({ note })
  } else {
    res.status(404).send({ error: 'Note not found' })
  }
})

router.put('/:id', async (req, res) => {
  const query = {
    $or: [{ author: req.user._id }, { collaborators: req.user._id }],
    _id: req.params.id
  }

  const note = await Note.findOneAndUpdate(query, req.body, { new: true })

  if (note) {
    res.status(200).send({ note })
  } else {
    res.status(400).send()
  }
})

router.delete('/:id', async (req, res) => {
  const deleted = await Note.findByIdAndRemove(req.params.id)
  if (deleted) {
    res.status(200).send({ deleted })
  } else {
    res.status(500).send({ error: 'Unable to delete note' })
  }
})

module.exports = router