function postCheck(req, res, next) {
    const { title, content } = req.body;
    if (!title || !content) return next({ code: 400, errorMessage: "Please provide title and content!" });
    req.note = { title, content };
    next();
}

module.exports.postCheck = postCheck;