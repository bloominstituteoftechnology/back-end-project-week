const express = require('express');
const router = express.Router();
const tokensecret = "your_jwt_secret";
const jwt = require("jsonwebtoken");
const auth = require("../dbhelpers/auth");
const passport = require("../passport")


router.post("/register", async function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ errorMessage: "Invalid body" });
  }
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 14);
    console.log(req.body);
    await auth.addUser(req.body.username, req.body.password);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log(err);
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    const token = jwt.sign(user.id, tokensecret);
    return res.json({ token });
  })(req, res);
});
router.use('/profile', passport.authenticate('jwt', { session: false }),
   async function(req, res) {
   const results= await auth.get();

        res.json({results})
    }
);


module.exports = router
