// Add database handling
const sqlite = require("sqlite3");
const express = require("express");
const server = express();

// Connect to database
const CONNECTION = sqlite.createConnection({
	host: "localhost",
	user: "dev",
	password: "password123",
	database: "lambdaNotes.db"
});

