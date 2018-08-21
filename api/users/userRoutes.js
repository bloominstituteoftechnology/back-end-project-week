const express = require('express');
const bcrypt = require('bcryptjs');
const usersDb = require('../../data/helpers/usersDb');
const { loginPostCheck, generateToken } = require('../../middleware/checks');

const router = express.Router();

router.post('/login', loginPostCheck, async (req, res, next) => {
    try {
        const user = await usersDb.login(req.credentials);
        if (!user || !bcrypt.compareSync(req.credentials.password, user.password)) return next({ code: 401, error: 'You shall not pass!' });
        const token = generateToken(user);
        return res.send(token);
    } catch (err) {
        next({ code: 500, error: "Couldn't save the user to the database." })
    }
});

module.exports = router;