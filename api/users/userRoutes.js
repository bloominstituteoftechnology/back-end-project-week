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

router.post('/register', loginPostCheck, async (req, res, next) => {
    const users = await usersDb.get();
    for (let i = 0; i < users.length; i++) {
        if (users[i].username.toLowerCase() === req.credentials.username.toLowerCase()) {
            return next({ code: 400, errorMessage: 'There is already a user with that name.' })
        }
    }
    try {
        const user = await usersDb.register(req.credentials);
        const token = generateToken({ id: user.id, ...req.credentials });
        return res.status(201).json({ id: user.id, ...req.credentials, token });
    } catch (err) {
        next({ code: 500, error: "Couldn't save the user to the database." })
    }
});

module.exports = router;