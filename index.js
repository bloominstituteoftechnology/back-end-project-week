const express = require("express");
const helmet = require("helmet");
const dbhelpers = require("./dbhelpers/helpers");
var cors = require('cors')

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());
app.use(helmet());

app.get("/notes", async (req, res) => {
  let results = await dbhelpers.getNotes();
  res.status(200).json(results);
});
app.get("/notes/:id", async (req, res) => {
  try {
    let results = await dbhelpers.getSingleNote(req.params.id);
    if (results.length === 0) {
      res.status(400).json({ errorMessage: "ID does not excist" });
      return;
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/notes", async (req, res) => {
  if (!req.body.title || !req.body.body) {
    res.status(400).json({ errorMessage: "Invalid body" });
    return;
  }
  try {
    const newID = await dbhelpers.addNote(req.body);
    const results = await dbhelpers.getSingleNote(newID[0]);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/notes/:id", async (req, res) => {
  if (!req.body.title || !req.body.body) {
    res.status(400).json({ errorMessage: "Invalid body" });
    return;
  }
  try {
    const result = await dbhelpers.editNote(req.params.id,req.body);
    if (result === 0) {
      res.status(400).json({ errorMessage: "ID does not excist" });
      return;
    }
    const editedDBentry = await dbhelpers.getSingleNote(req.params.id);

    res.status(200).json(editedDBentry);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    let results = await dbhelpers.deleteNote(req.params.id);
    if (results === 0) {
      res.status(400).json({ errorMessage: "ID does not excist" });
      return;
    }
    res.status(200).json({message:"Delete Successful"});
  } catch (err) {
    res.status(500).json(err);
  }
});

app.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);

app.listen(port, () => console.log(`Listening on port ${port}!`));
