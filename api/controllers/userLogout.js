const session = require('express-session');

server.post('/logout', (req, res) => {
  if (!req.session.username) res.send('User is not logged in.');
  req.session.destroy;
  res.send(req.session);
});
