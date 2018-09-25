const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const notes = require("./routers/notesRouter");
const auth = require("./routers/authRouter");
const passport = require("./passport")


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/auth", auth);
app.use("/notes", passport.authenticate('jwt', { session: false }), notes);

app.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);
app.listen(port, () => console.log(`Listening on port ${port}!`));
