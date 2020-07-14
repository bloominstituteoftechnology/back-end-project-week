const db = require('../../dbConfig.js');
const bcrypt = require('bcryptjs');
const { generateToken } = require('./middleware.js');

function register (req, res) {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  db.insert(creds)
    .into('users')
    .then(async () => {
      await db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        const token = generateToken(user);
        res.status(201).json({ token });
      })
      .catch(err => {
        res.status(500).send(err)});
    })
    .catch(err => {
      res.status(500).send(err)});
};
  
  function login (req, res) {
    const creds = req.body;
    db('users')
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: 'Incorrect username or password.' });
        }
      })
      .catch(err => res.status(500).send(err));
  };

  module.exports = {
    register,
    login
  };