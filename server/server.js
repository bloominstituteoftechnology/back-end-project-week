const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const database = require("./database/helpers/models");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({}));

app.get("/note/get/all", (req, res) => {
  database
    .get()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

app.get("/note/get/:id", (req, res) => {
  const { id } = req.params;
  database
    .get(id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

app.post("/note/create", (req, res) => {
  const note = req.body;
  database
    .insert(note)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

app.put("/note/edit/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  database
    .update(id, changes)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

app.delete("/note/delete/:id", (req, res) => {
  const { id } = req.params;
  database
    .remove(id)
    .then(response => {
      res.json({ response });
    })
    .catch(error => {
      return error;
    });
});

app.listen(4000, () => console.log("listening on port 4000!"));
