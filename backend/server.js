const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const server = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/notes");
