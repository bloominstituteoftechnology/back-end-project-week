const express = require('express');
const bcrypt = require('bcryptjs');
const usersDb = require('../../data/helpers/usersDb');
const { loginPostCheck, loginCheck, generateToken, orderCheck } = require('../../middleware/checks');

const router = express.Router();

router.put('/:id', orderCheck, async (req, res, next) => {
    try {
        const order = await usersDb.update(req.params.id, req.order);
        if (!order) return next({ code: 404, message: "The user with the specified ID does not exist." });
        res.status(200).json(order);
    } catch (err) {
        next({ code: 500, error: "The user information could not be modified." });
    }
});

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
            return next({ code: 409, errorMessage: 'There is already a user with that name.' });
        }
    }
    try {
        const hash = bcrypt.hashSync(req.credentials.password, 14);
        req.credentials.password = hash;
        const user = await usersDb.register(req.credentials);
        const token = generateToken({ id: user.id, ...req.credentials });
        res.status(201).json({ id: user.id, ...req.credentials, token });
    } catch (err) {
        next({ code: 500, error: "Couldn't save the user to the database." });
    }
});

router.get('/auth', loginCheck, (req, res, next) => {
    res.status(200).json({ success: true });
})

module.exports = router;