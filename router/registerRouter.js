const express = require('express');
const bcrypt = require('bcryptjs');
// JWT
const { generateToken } = require('../middleware/jwt');
const usersDB = require('../data/helpers/usersDB');
const { userConstraints } = require('../middleware');
const router = express.Router();

router.post('/', userConstraints, async (req, res) => {
  const { USERNAME, CLEARPASSWORD } = req;

  try {
    // hash the password
    const HASH = await bcrypt.hash(CLEARPASSWORD, 14);
    const USER = { username: USERNAME, password: HASH };
    try {
      const response = await usersDB.insert(USER);
      if (response) {
        // set JWT: generate the token
        const token = {};
        token.jwt = generateToken(USER);
        // attach the username and id to the token
        token.username = USERNAME;
        token.id = response.id;
        // attach token to the response
        console.log('TOKEN', token);
        res.status(200).send(token);
      } else {
        res.status(400).json({
          error: `Undetermined error adding user.`,
        });
      }
    } catch (err) {
      res.status(500).send(`${err}`);
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

module.exports = router;
