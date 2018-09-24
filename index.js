const express = require("express");
const helmet = require("helmet");
const dbhelpers = require("./dbhelpers/helpers");

const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());

app.get("/notes", async (req, res) => {
  let results = await dbhelpers.getNotes();
  res.status(200).json(results);
});
app.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);

app.listen(port, () => console.log(`Listening on port ${port}!`));
