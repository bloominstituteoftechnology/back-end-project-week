const express = require("express");
const router = express.Router();
const db = require("../db/dbHelper/user");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);
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

router.post('/register', (req, res) => {
    const creds = req.body

    const hash = bcrypt.hashSync(creds.password, 12);
    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            //console.log(ids)
            const id = ids[0]
            db('users')
                .where({ id })
                .first()
                .then(user => {
                    const token = generateToken(user);
                    res.status(200).json({ token })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ msg: 'error generating token' })
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "there was an error registering user" })
        })

})

router.post('/login', (req, res) => {
    const creds = req.body;
    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                //console.log(user)
                const token = generateToken(user);
                res.status(200).json({ token })
            } else {
                res.status(401).json({ msg: 'You have failed to log in' })
            }
        })
})


module.exports = router;