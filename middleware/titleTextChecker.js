module.exports = (req, res, next) => {
  req.body.title && typeof req.body.title === 'string' && req.body.title.length < 256 && req.body.textBody && typeof req.body.textBody === 'string' && req.body.textBody.length < 2048
  ? next()
  : res.json({ error: "please provide a 'title' less than 256 characters and textBody under 2048 characters" })
}