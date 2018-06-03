const router = require("express").Router();
const User = require("./User");

router.get("/", (req, res) => {
  User.find()
    .select("username")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
