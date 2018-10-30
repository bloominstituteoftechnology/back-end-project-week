const express = require("express");
const router = express.Router();
const db = require("../db/dbHelper/user");

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