const express = require("express");

const authHelper = require("../auth");

const notesRoutes = require("./notesRoutes");
const authRoutes = require("./authRoutes");
const usersRoutes = require("./usersRoutes");

const router = express.Router();

router.use("/notes", notesRoutes);
router.use("/", authRoutes);
router.use("/users", authHelper.protected, usersRoutes);

module.exports = router;
