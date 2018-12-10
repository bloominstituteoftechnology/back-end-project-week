const express = require('express')
const db = require('../../data/dataHelpers')

const router = express()

const getNoteList = async (req, res) => {
  try {
    const notes = await db.getNoteList();

    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({error}) 
  }
}


const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await db.getNote(id);

    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({error}) 
  }
}

const postNote = async (req, res) => {
  try {
    // destructing body
    const { id, title, content } = req.body
    const newNote = {
      title,
      content
    }
    const notes = await db.addNote(newNote);

    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({error}) 
  }
}

const putNote = async (req, res) => {
  try {
    const { id } = req.params
    // destructing body
    const { title, content } = req.body
    const newNote = {
      id,
      title,
      content
    }
    const notes = await db.updateNote(newNote);

    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({error}) 
  }
}

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params
    const notes = await db.deleteNote(id);

    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({error}) 
  }
}

const echo = (req, res) => {
  res.status(200).json({
    message: 'hey this endpoint work!',
    params: req.params,
    query: (req.query ? req.query : ''),
    body: req.body
  });
}

router.get('/', getNoteList)
router.get('/:id', getNote)
router.post('/', postNote)
router.put('/:id', putNote)
router.delete('/:id', deleteNote)


module.exports = router;