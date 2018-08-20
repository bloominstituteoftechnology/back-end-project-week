function postCheck(req, res, next) {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ errorMessage: "Please provide title and content!" });
    req.note = { title, content };
    next();
}

module.exports.postCheck = postCheck;