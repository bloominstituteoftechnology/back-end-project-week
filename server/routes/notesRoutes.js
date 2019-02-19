const express = require('express');

const router = express.Router()

const notes = require('../notes/notesModel')

router.get('/notes', async (req, res) => {
  const {username} = req.params;
  try {
    const allNotes = await notes.getAllNotes(username)
    res.status(200).json(allNotes)  
  } catch (error) {
    res.status(500).json({failure: 'unable to get all the notes'})
  }
})

router.get('/note/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let note = await notes.getNoteByID(id)
    note = note[0];
    res.status(200).json(note)
  } catch (error) {
    res.status(500).json({failure: 'unable to get the note'})
  }
})

router.post('/note/create', async (req, res) => {
  const {title, content} = req.body

  if(title && content) {
    try {
      await notes.createNote(req.body)
      res.status(201).json({success: "the note has been added"})
    } catch (error) {
      res.status(500).json({failure: "unable to create the note"})
    }
  } else {
    res.status(422).json({failure: "please add the title or the content"})
  }
})

router.put('/note/:id/edit', async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body

  if (title && content ) {
    try {
      await notes.updateNote(id, req.body)
      res.status(201).json({success: "the note has been updated"})
    } catch (error) {
      res.status(500).json({failure: 'unable to update the note'})
    }
  } else {
    res.status(422).json({failure: 'please make sure to add a title and content'})
  }
})

router.delete('/note/:id/delete', async (req, res) => {
  const { id } = req.params

  try {
    await notes.deleteNote(id)
    res.status(200).json({success: "the note has been deleted"})
  } catch (error) {
    res.status(500).json({failure: 'unable to delete the note'})
  }
})

module.exports = router