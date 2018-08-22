const express = require('express');
const bcrypt = require('bcryptjs');
const usersDb = require('../../data/helpers/usersDb');
const { loginPostCheck, loginCheck, generateToken } = require('../../middleware/checks');

const router = express.Router();

router.post('/login', loginPostCheck, async (req, res, next) => {
    try {
        const user = await usersDb.login(req.credentials);
        if (!user) return next({ code: 401, error: "The username you entered doesn't belong to an account." })
        if (!bcrypt.compareSync(req.credentials.password, user.password)) return next({ code: 401, error: "Invalid password" });
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
            return next({ code: 400, errorMessage: 'There is already a user with that name.' });
        }
    }
    try {
        const hash = bcrypt.hashSync(req.credentials.password, 14);
        req.credentials.password = hash;
        const user = await usersDb.register(req.credentials);
        const token = generateToken({ id: user.id, ...req.credentials });
        return res.status(201).json({ id: user.id, ...req.credentials, token });
    } catch (err) {
        next({ code: 500, error: "Couldn't save the user to the database." });
    }
});

router.get('/auth', loginCheck, (req, res, next) => {
    res.status(200).json({ success: true });
})

module.exports = router;