const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../../data/dbConfig");
const users = require("../../users/usersModel")
const { generateToken } = require("../../auth/authenticate");

const router = express.Router();

const secret =
  process.env.JWT_SECRET ||
  "add a .env file to root of project with the JWT_SECRET variable";

// const generateToken = user => {
//   const payload = {
//     username: user.username
//   };
//   const options = {
//     expiresIn: "1d",
//     jwtid: 12345
//   };
//   return jwt.sign(payload, secret, options);
// };

router.post("/register", (req, res) => {
  let user = req.body
  console.log({user: user})
  if (
    !user.username ||
    typeof user.username !== "string" ||
    user.username === ""
  ) {
    res
      .status(400)
      .json({ error: "username must be included and must be a string" });
  } else if (
    !user.password ||
    typeof user.password !== "string" ||
    user.password === ""
  ) {
    res
      .status(400)
      .json({ error: "password must be included and must be a string" });
  } else if (user.username.length > 255) {
    res.status(400).json({ error: "username must not exceed 255 characters" });
  } else if (user.password.length > 255) {
    res.status(400).json({ error: "password must not exceed 255 characters" });
  } else {
    

    // Hash password using bcrypt
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    db("users")
        .insert(user)
        .then(ids => {
            const id = ids[0];

            return users
            .fetchByUserName(user.username)
        })
        .then(response => {
          const token = generateToken(response);
          res.status(201).json(token);
      })
      .catch(err => {
          res.status(500).json(err);
      });
  }
});

router.post("/login", (req, res) => {
  const user = req.body;

  if (
    !user.username ||
    typeof user.username !== "string" ||
    user.username === ""
  ) {
    res
      .status(400)
      .json({ error: "username must be included and must be a string" });
  } else if (
    !user.password ||
    typeof user.password !== "string" ||
    user.password === ""
  ) {
    res
      .status(400)
      .json({ error: "password must be included and must be a string" });
  } else {
    

    return users
        .fetchByUserName(user.username)
        .first()
        .then(response => {
          console.log({user: user, response: response})
            if (response && bcrypt.compareSync(user.password, response.password)) {
                const token = generateToken(response);

                res.status(200).json(token);
            } else {
                res.status(401).json({ message: "Incorrect Login Information!" });
            }
        })
        .catch(err => {
            res.status(500).json({ err });
        });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send("failed to logout");
    } else {
      res.send("logout successful");
    }
  });
});

router.get("/", (req, res) => {
  users
    .fetch()
    .then(users => {
      users[0]
        ? res.status(200).json(users)
        : res
            .status(400)
            .json({ error: "there are currently no users in our directory" });
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve users" });
    });
});

module.exports = router;
