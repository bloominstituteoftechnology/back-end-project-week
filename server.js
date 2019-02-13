const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/api/notes", (req, res) => {

});

app.post("/api/notes", (req, res) => {

});

app.get("/api/notes/:id", (req, res) => {

});

app.put("/api/notes/:id", (req, res) => {

});

app.delete("/api/notes/:id", (req, res) => {

});

app.listen(PORT, () => {
    console.log("Server listening on Port " +PORT);
});