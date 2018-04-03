const userLogout = (req, res) => {
  if (!req.session.username) res.send('User is not logged in.');
  req.session.destroy;
  res.send(req.session);
};

module.exports = {
  userLogout,
};
