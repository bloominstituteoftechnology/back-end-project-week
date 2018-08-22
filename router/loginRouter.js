const express = require('express');
const bcrypt = require('bcryptjs');
// JWT
const { generateToken } = require('../middleware/jwt');
const usersDB = require('../data/helpers/usersDB');
const { loginConstraints } = require('../middleware');
const router = express.Router();

router.post('/', loginConstraints, async (req, res) => {
  const { USERNAME, CLEARPASSWORD } = req;

  try {
    const USER = await usersDB.getByUsername(USERNAME);
    if (USER) {
      const VALID = await bcrypt.compare(CLEARPASSWORD, USER.password);
      if (VALID) {
        console.log('USER in VALID', USER);
        // set JWT: generate the token
        const token = {};
        token.jwt = generateToken(USER);
        // attach the username and id to the token
        token.username = USERNAME;
        token.id = USER.id;
        // attach token to the response
        console.log('TOKEN before sending', token);
        res.status(200).send(token);
      } else {
        res.status(401).json({ error: `Unauthorized` });
      }
    } else {
      // error with the user, but don't let the hackers know!
      // take the same amount of time as if legit checking
      await bcrypt.compare(
        CLEARPASSWORD,
        '$2a$14$plRslh.07bHu/BWHztxq9.20YIJluMBo9JhdIOCJOQjvAZHmbPV6a',
      );
      res.status(401).json({ error: `Unauthorized` });
    }
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

module.exports = router;
