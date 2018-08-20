const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({}));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(4000, () => console.log("listening on port 4000!"));
