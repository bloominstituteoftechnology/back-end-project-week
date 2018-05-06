/* Catches Promise rejections and passes it along to handleErrors */
exports.catchErr = fn => (req, res, next) => fn(req, res, next).catch(next)

/* Error handler */
exports.handleErr = (err, req, res, next) => {
  const error = {
    status: err.status || 500,
    message: err.message,
    stack: err.stack || ''
  }
  res.status(error.status).json(error)
}

exports.sendErr = (code, msg, res) => res.status(code).json({ error: msg })