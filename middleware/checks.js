const jwt = require('jsonwebtoken');

function noteCheck(req, res, next) {
    const { title, content, tagId, tags, tag } = req.body;
    if (!title || !content) return next({ code: 400, errorMessage: "Please provide title and content!" });
    req.note = { title, content };
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

function generateToken(user) {
    const payload = { userId: user.id };
    const options = { expiresIn: '1h' }

    return jwt.sign(payload, config.secret, options);
}

module.exports = {
    noteCheck,
    loginPostCheck,
    generateToken
}
