// ---- Node Dependencies ----
const axios = require("axios");
const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig");
const { authenticate, generateToken } = require("./authentication");

// ---- API Endpoints for Testing ----
server.get("/api/all", all);
server.post("/api/create", create);
sever.get("/api/view/:id", view);
sever.put("/api/edit/:id", edit);
