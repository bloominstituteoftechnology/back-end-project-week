function noteCheck(req, res, next) {
    const { title, content, tagId, tags, tag } = req.body;
    if (!title || !content) return next({ code: 400, errorMessage: "Please provide title and content!" });
    req.note = { title, content };
    req.tagId = tagId;
    req.tags = tags;
    req.tag = tag;
    next();
}

module.exports.noteCheck = noteCheck;