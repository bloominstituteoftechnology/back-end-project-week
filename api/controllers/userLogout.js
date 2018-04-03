const userLogout = (req, res) => {
  if (!req.session.username) res.send('User is not logged in.');
  console.log(req.session);
  req.session.username = null;
  // lookup req.session.destroy
  res.send(req.session);
};

module.exports = {
  userLogout,
};
