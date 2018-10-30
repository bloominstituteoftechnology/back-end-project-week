const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db/dbHelper/user");
const router = express.Router();

const secret = process.env.SECRET || "jwt-secret";

function genToken(user) {
    const payload = {
        username: user.username
    };

    const options = {
        expiresIn: "15h",
        jwtid: "8102"
    };

    return jwt.sign(payload, secret, options);
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


router.post("/register", async (req, res, next) => {
    try {
        const salt = getRandomArbitrary(10, 20);
        const hash = await bcrypt.hash(req.body.password, salt);
        res.status(200).json({
            status: true,
            data: await db.addUser(req.body.username, hash)
        });
    } catch (err) {
        console.log(err)
        next(err);
    }
});


router.post("/login", async (req, res, next) => {
    try {
        console.log(req)
        const hashPass = await db.getUserByUserName(req.body.username);
        if (await bcrypt.compare(req.body.password, hashPass[0].password))
            res.status(200).json({
                status: true,
                token: genToken(req.body.username, hashPass[0].department)
            });
        else res.status(200).json({ status: false });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
