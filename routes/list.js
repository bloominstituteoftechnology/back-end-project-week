const express=require('express');
const db = require('../db/dbHelper/list');
const router = express.Router();

router.post("/create", async (req, res, next) => {
    try {
        await db.addList(req.body);
        res.status(200).json({
            status: true
        });
    } catch (err) {
        next(err);
    }
});

router.post("/addNote", async (req, res, next) => {
    try {
        await db.addNotes(req.body);
        res.status(200).json({
            status: true
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
