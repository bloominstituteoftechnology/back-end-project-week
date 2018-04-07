const authenticateUser = (req, res, next) => {
  if (req.session.username) {
    User.findOne({ username: req.session.username })
      .then(foundUser => {
        req.user = foundUser;
        res.status(200);
        next();
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    res.status(404).json({ error: err });
  }
};
