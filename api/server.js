require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const knex = require("knex");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);
const noteRouter = require("../notes/noteRouter");
const userRouter = require("../users/userRouter");
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

// sanity check route
server.get("/", (req, res) => {
    res.status(200).json({api: "running"});
})

// note routes
server.use("/api/notes", noteRouter)

// user routes
server.use("/api/users", userRouter)
module.exports = server;