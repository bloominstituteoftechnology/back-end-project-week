const emptyBody = (req, res, next) => {

  if (!req.body.title && req.body.title === null && req.body.title === "") {
    res.status(500).json({ msg: 'no title' })
  }
  if (!req.body.text && req.body.text === null && req.body.title === "") {
    res.status(500).json({ msg: 'no text' })
  }
  else {
    next()
  }

}
module.exports = emptyBody;