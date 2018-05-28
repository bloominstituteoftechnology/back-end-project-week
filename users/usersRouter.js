const User = require("./User.js");

const router = require("express").Router();

router.get("/", (req, res) => {
  if (!req.session.auth) res.status(422).json("You are not logged in");
  if (req.session._id)
    res.status(200).json({
      success: true,
      _id: req.session._id,
      username: req.session.username
    });
});

router.post("/", (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.status(422).json({ error: "Username and password are mandatory" });
  } else {
    User.create({
      username: username.toLowerCase(),
      password: password
    })
      .then(saved => {
        req.session.auth = true;
        req.session._id = saved._id;
        req.session.username = saved.username;
        res.status(201).json(saved);
      })
      .catch(error => {
        console.log(error);
        if (error.code === 11000)
          res
            .status(422)
            .json({ success: false, message: "User already exists" });
        else
          res
            .status(500)
            .json({ success: false, message: "Something bad happened" });
      });
  }
});

module.exports = router;
