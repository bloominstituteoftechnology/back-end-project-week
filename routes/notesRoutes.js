const express = require('express');
const helper = require('../data/notesHelper.js');
const tagsHelper = require('../data/tagsHelper');
const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const notes = await helper.getNotes();
      res.status(200).json(notes);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    const note = req.body;
    try {
      const count = await helper.addNote(note);
      res.status(201).json({ id: count[0] });
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await helper.getNote(id);
      const note = result[0];
      note ? res.status(200).json(note) : next({ statusCode: 404 });
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    const { id } = req.params;
    const note = req.body;
    try {
      const count = await helper.updateNote(id, note);
      const newNoteArr = await helper.getNote(id);
      const { title, content } = newNoteArr[0];
      count > 0
        ? res.status(200).json({ title, content })
        : next({ statusCode: 404 });
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    const { id } = req.params;
    try {
      const count = await helper.deleteNote(id);
      count > 0
        ? res.status(200).json({ message: 'Note successfully deleted.' })
        : next({ statusCode: 404 });
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:id/tags')
  .get(async (req, res, next) => {
    const { id } = req.params;
    try {
      const tags = await tagsHelper.getNoteTags(id);
      res.status(200).json(tags);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    const { id } = req.params;
    const { tag } = req.body;
    try {
      let existingTag = await tagsHelper.getTag(tag).first();
      if (!existingTag) {
        const newTag = await tagsHelper.addTag({ title: tag });
        existingTag = await tagsHelper.getTag(tag).first();
      }
      if (existingTag) {
        const addedTag = await tagsHelper.addTagToNote(id, existingTag.id);
        res.status(200).json(existingTag);
      }
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
