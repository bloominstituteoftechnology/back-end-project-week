module.exports = (req, res, next) => {
  if (req.body.title) {
    req.body.title = req.body.title.toUpperCase() + req.body.title.slice(1);
  }
  next();
};
