const express = require("express");
const router = express.Router();
const db = require("../db/dbHelper/user");


/**
 * @api {get} /api/users/ Request users information
 * @apiGroup User
 * @apiSuccess {Boolean} Status if the api has completed or not.
 * @apiSuccess {Array} users  Array of all users in it.
 */
router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({
      status: true,
      users: await db.getUsers()
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
});


/**
 * @api {get} /api/users/:id Request user information
 * @apiGroup User
 * 
 * @apiSuccess {Boolean} Status if the api has completed or not.
 * @apiSuccess {data} User  User Data.
 */
router.get("/:id", async (req, res, next) => {
  try {
    res.status(200).json({
      stauts: true,
      data: await db.getUserById(req.body.id)
    });
  } catch (err) {
    next(err);
  }
});


/**
 * @api {get} /api/usrs/:id Deletes user information
 * @apiGroup User
 * 
 * @apiSuccess {Boolean} Status if the api has completed or not.
 * @apiSuccess {Array} UpdatedUsers  Array of all the users in it.
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await db.delUser(req.params.id);
    res.status(200).json({
      status: true,
      updatedUsers: await db.getUsers()
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
