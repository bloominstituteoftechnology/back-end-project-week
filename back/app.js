//packages to import
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//models to import
const NoteModel = require("./models/NoteModel");

//server and database setup
const port = process.env.PORT || 3001;
const app = express();
mongoose.connect("mongodb://localhost:27017/notes");
mongoose.connection
.once("open", (err, res) => {
    if (err) return console.log(`There was an error starting Mongoose: \n ${err}`);
    console.log(`Mongoose is running`);
});

//middleware etc.
app.use(bodyParser.json());
mongoose.Promise = global.Promise;

//test route handler
app.get("/", (req, res) => {
    res.json(`it's alive!`);
});

//get handler for all notes
app.get("/api/allNotes", (req, res) => {
    NoteModel.find({}, (err, response) => {
        if (err) return console.log(`There was an error getting the notes: ${err}`);
        console.log(`Here are all the notes: \n ${reponse}`);
        res.status(200)
        .json(response);
    })
});

//get handler for finding notes by id
app.get("/api/viewNote/:id", (req, res) => {
    const id = req.params.id;
    if (!id){
        console.log(`An ID for getting a note was not provided`);
        res.status(422)
        .json(`An ID was not provided`);
        return;
    }

    NoteModel.findById(id, (err, response) => {
        if (err){
            console.log(`A post with that ID wasn't found`);
            res.status(404)
            .json(`A post with that ID wasn't found`);
            return;
        } else {
            console.log(`The post was found: \n ${response}`);
            res.status(200)
            .json(response);
        }
    })
});

//handler for adding a new note
app.post("/api/addNote", (req, res) => {
    console.log(req.body)
    if (!req.body.title || !req.body.content){
        console.log('Note was not filled in properly');
        return res.status(422)
        .json(`The note was not properly filled out.`);
    }

    const newModel = {
        title: req.body.title,
        content: req.body.content
    }

    NoteModel(newModel)
    .save()
    .then(response => {
        console.log(`The note was saved: \n ${newModel}`)
        res.status(200)
        .json(`The note was saved successfully!`);
    })
    .catch(err => {
        console.log(`There was an error on the server: \n ${err}`);
        res.status(500)
        .json(`There was an error on the server`);
    })
});

//handler for updating a note
app.put("/api/editNote/:id", (req, res) => {
    const id = req.params.id;
    const newTitle = req.body.title;
    const newContent = req.body.content;
    if (!id){
        console.log(`An ID was not provided for updating a note`);
        res.status(422)
        .json(`An ID was not provided`);
        return;
    }
    if (!newTitle && !newContent){
       console.log(`Updated note information was not provided`);
       res.status(422)
       .json(`Updated note information was not provided`);
       return; 
    }

    if (newTitle && newContent){
        NoteModel.findByIdAndUpdate(id, {title: newTitle, content: newContent}, {new: true}, (err, response) => {
            if (err) {
                console.log(`There was an error finding a note to update with that id`);
                res.status(404)
                res.json(`There was an error finding a note to update with that id`);
                return;
            }

            console.log(`The note was updated with a new title and new content: \n ${response}`);
            res.status(200)
            .json(response);
        })
    }

    if (!newTitle && newContent){
        NoteModel.findByIdAndUpdate(id, {content: newContent}, {new: true}, (err, response) => {
            if (err) {
                console.log(`There was an error finding a note to update with that id`);
                res.status(404)
                res.json(`There was an error finding a note to update with that id`);
                return;
            }

            console.log(`The note was updated with a new title and new content: \n ${response}`);
            res.status(200)
            .json(response);
        })
    }

    if (newTitle && !newContent){
        NoteModel.findByIdAndUpdate(id, {title: newTitle}, {new: true}, (err, response) => {
            if (err) {
                console.log(`There was an error finding a note to update with that id`);
                res.status(404)
                res.json(`There was an error finding a note to update with that id`);
                return;
            }

            console.log(`The note was updated with a new title and new content: \n ${response}`);
            res.status(200)
            .json(response);
        })
    }
});

//handler for deleting a note
app.delete("/api/deleteNote/:id", (req, res) => {
    const id = req.params.id;

    if (!id){
        console.log(`An ID for deleting a note was not provided`);
        res.status(422)
        .json(`An ID was not provided`);
        return;
    }

    NoteModel.findByIdAndRemove(id, (err, response) => {
        if (err) {
            console.log(`There was an error removing the note: \n ${err}`);
            res.status(500)
            .json(`There was an error on the server`);
            return;
        }

        console.log(`The note was removed: \n ${response}`);
        res.status(200)
        .json(response);
    })
})

app.listen(port);
console.log(`The server is listening on port ${port}`);