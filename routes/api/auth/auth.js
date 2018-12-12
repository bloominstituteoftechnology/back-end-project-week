const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../../../data/dbConfig');

// JWT Config
function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  };
  const secret = 'ThisisasecretthatIwillsoonputintoaenvfile';
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, secret, options);
}

// REGISTER USER
router.post('/register', async (req, res) => {
  const registrationData = req.body;
  let { username, email, password } = registrationData;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Email, username, and password are required.' });
  }

  try {
    const usernameExists = await db('users')
      .where({ username })
      .first();

    if (usernameExists) {
      return res.status(401).json({ message: 'That username is taken.' });
    }
    const emailExists = await await db('users')
      .where({ email })
      .first();

    if (emailExists) {
      return res.status(401).json({
        message: 'There is already an account registered with that email.'
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'There was an error accessing the database.' });
  }
  const hash = bcrypt.hashSync(password, 8);
  password = hash;
  try {
    const [userId] = await db('users').insert(
      { username, password, email },
      'id'
    );
    res.status(201).json(userId);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'There was an error posting to the database.' });
  }
});

// LOGIN USER
router.post('/login', async (req, res) => {
  const loginData = req.body;
  if (!loginData.username || !loginData.password) {
    return res
      .status(400)
      .json({ message: 'A username and password is required to login' });
  }
  try {
    const user = await db('users')
      .where({ username: loginData.username })
      .first();

    if (user && bcrypt.compareSync(loginData.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `welcome back ${user.username}`, token });
    } else {
      res.status(401).json({ message: 'Username or password is incorrect.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'There was an error logging in.' });
  }
});

module.exports = router;
