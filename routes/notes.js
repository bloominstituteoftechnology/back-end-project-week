const express = require("express");
const router = express.Router();
const db = require("../db/dbHelper/index");

/**
 * @api {get} /api/notes Request notes information
 *
 * @apiSuccess {Boolean} Status if the api has completed or not.
 * @apiSuccess {Array} Notes  Array of all the notes in it.
 */
router.get("/:pageId", async (req, res, next) => {
  try {
    res.status(200).json({
      status: true,
      notes: await db.getNotes(parseInt(req.query.page, 10))
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
});

/**
 * @api {get} /api/notes/:id Request notes information
 *
 * @apiParam {Number} id Notes unique ID.
 * 
 * @apiSuccess {Boolean} Status if the api has completed or not.
 * @apiSuccess {Array} Notes  notes.
 */
router.get("/:id", async (req, res, next) => {
  try {
    res.status(200).json({
      status: true,
      note: await db.getNote(req.params.id)
    });
  } catch (err) {
    next(err);
  }
});
/**
 * @api {post} /api/notes Adds new notes into DB
 *
 * @apiSuccess {Boolean} Status if the api has completed or not.
 * @apiSuccess {Array} UpdatedNotes  Array of all the notes in it.
 */

router.post("/", async (req, res, next) => {
  try {
    console.log('~~~~~~~~~~~~~~~~~~~')
    console.log('req body', req.body)
    await db.addNote(req.body);
    res.status(200).json({
      status: true,
      updatedNotes: await db.getNotes()
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @api {put} /api/notes Updated notes information
 *
 * @apiParam {Number} id Notes unique ID.
 * 
 * @apiSuccess {Boolean} Status if the api has completed or not.
 * @apiSuccess {Array} UpdatedNotes  Array of all the notes in it.
 */
router.put("/:id", async (req, res, next) => {
  try {
    await db.putNote({ id: req.params.id, ...req.body });
    res.status(200).json({
      status: true,
      updatedNotes: await db.getNotes()
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @api {delete} /api/notes Deletes notes information
 *
 * @apiParam {Number} id Notes unique ID.
 * 
 * @apiSuccess {Boolean} Status if the api has completed or not.
 * @apiSuccess {Array} UpdatedNotes  Array of all the notes in it.
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await db.delNote(req.params.id);
    res.status(200).json({
      status: true,
      updatedNotes: await db.getNotes()
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
