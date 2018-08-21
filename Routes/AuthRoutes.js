const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersDB = require("../data/db.js");

const router = express.Router();

/*router.get("/api/users", async (req, res) => {
  const department = req.jwtToken.department;
  try {
    const list = await db("Users").where({ department });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/
const secret = "new green";

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "2h",
    jwtid: "183792"
  };
  return jwt.sign(payload, secret, options);
}

function protected(req, res, next) {
  const token = req.headers.authorization;
  console.log("header is: ", req.headers);
  console.log("token is: ", token);

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "invalid token" });
      }
      req.jwtToken = decodedToken;
      console.log("req.jwtToken: ", req.jwtToken);
      next();
    });
  } else {
    return res.status(401).json({ error: "no token provided. " });
  }
}

router.get("/", protected, async (req, res) => {
  try {
    const list = await usersDB("Users");
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/register", async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  if (!user.username || !user.password) {
    res.status(401).json({ error: "Please enter a username and password" });
  }
  try {
    const ids = await usersDB.insert(user).into("Users");
    try {
      const newUser = await usersDB("Users")
        .where({ id: ids[0] })
        .first();
      // Generate the token
      console.log("user in register is: ", user);
      console.log("newUser in register is: ", newUser);
      const token = generateToken(newUser);

      // attach the token to the response
      res.status(201).json(token);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const credentials = req.body;
  console.log("req.body is: ", req.body);
  const username = credentials.username;
  try {
    const getUser = await usersDB
      .select()
      .from("Users")
      .where({ username })
      .first();
    if (getUser && bcrypt.compareSync(credentials.password, getUser.password)) {
      console.log("getUser in Login is: ", getUser);
      console.log("credentials.password is: ", credentials.password);
      console.log("getUser.password is: ", getUser.password);
      const token = generateToken(getUser);
      res.send(token);
    } else {
      return res.status(401).json({ error: "Incorrect credentials, you shall not pass!" });
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
