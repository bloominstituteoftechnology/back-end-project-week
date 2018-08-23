const jwt = require('jsonwebtoken');
const config = require('../data/config');

function noteCheck(req, res, next) {
    const { title, content, user_id, tagId, tags, tag } = req.body;
    if (!title || !content) return next({ code: 400, errorMessage: "Please provide title and content!" });
    req.note = { title, content, user_id };
    req.tagId = tagId;
    req.tags = tags;
    req.tag = tag;
    next();
}

function loginPostCheck(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) return next({ code: 400, errorMessage: "Please provide a username and password!" });
    req.credentials = { username, password };
    next();
}

function loginCheck(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, config.secret, (err, decodedToken) => {
            if (err) return res.status(401).json({ error: 'Token invalid' });
            req.jwtToken = decodedToken;
            next();
        })
    } else {
        return res.status(401).json({ error: 'No Token' });
    }
}

function orderCheck(req, res, next) {
    const { note_order } = req.body;
    if (!note_order) return next({ code: 400, errorMessage: "Please provide the order!" });
    req.order = { note_order: JSON.stringify(note_order) };
    next();
}

function generateToken(user) {
    const payload = { userId: user.id };
    const options = { expiresIn: '1h' }

    return jwt.sign(payload, config.secret, options);
}

module.exports = {
    noteCheck,
    loginPostCheck,
    loginCheck,
    orderCheck,
    generateToken
}
