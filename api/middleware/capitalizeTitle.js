module.exports = (req, res, next) => {
  if (req.body.title) {
    req.body.title =
      req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1);
  }
  next();
};
