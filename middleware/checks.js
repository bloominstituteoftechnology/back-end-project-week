const jwt = require('jsonwebtoken');
const config = require('../data/config');

function noteCheck(req, res, next) {
    const { sort_id, title, content, tagId, tags, tag } = req.body;
    if (!title || !content) return next({ code: 400, errorMessage: "Please provide title and content!" });
    req.note = { sort_id, title, content };
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
            next();
        })
    } else {
        return res.status(401).json({ error: 'No Token' });
    }
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
    generateToken
}
