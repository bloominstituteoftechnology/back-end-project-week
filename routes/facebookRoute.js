const router = require('express').Router()

const passport = require("passport");

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/notes",
  passport.authenticate("facebook", {
    successRedirect: "/notes",
    failureRedirect: "/login"
  })
);

module.exports = router