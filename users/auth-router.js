const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

const Users = require("./users-model.js");

// for endpoints beginning with /api/auth
router.post("/register", validateUserContent, checkUnique, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json({
        saved,
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", validateUserContent, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate token
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token, //return the token upon login
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET: log out a user
router.get("/logout", (req, res) => {

  // user is not logged in; ignore
  if (!req.session)
      { res.status(200).json({message: "No need to log out if you are not logged in."}) }
  else
  {
      req.session.destroy(error => {
          if (error)
              { res.status(500).json({message: "Could not log out."}) }
          else
              { res.status(200).json({message: "Successfully logged out."}) }
      })
  }
})

// ---------------------- Generate Token ---------------------- //

function generateToken(user) {
  const payload = {
    subject: user.id, // standard claim = sub
    username: user.username,
    // role: user.role || "user"  (optional: if there's role in db schema)
  };
  const options = {
    expiresIn: "7d",
  };
  return jwt.sign(payload, jwtSecret, options);
}

// ---------------------- Custom Middleware ---------------------- //

function validateUserContent(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .json({ message: "Username & password fields are required." });
  } else {
    next();
  }
}

function checkUnique(req, res, next) {
  Users.findBy({ username: req.body.username })
    .then(foundUser => {
      if (foundUser.length === 0) {
        next();
  } else { res.status(400).json({ message: 'Username is already taken' });
}
})
}

module.exports = router;