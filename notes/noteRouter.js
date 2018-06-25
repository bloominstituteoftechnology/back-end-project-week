// const middleware = require("../middleware.js");
const express = require("express");
const router = express.Router();

router.route(["/", "/:id"]).get((req, res) => {
  res.json({ foo: "bar" });
});

module.exports = router;
