//packages to import
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
let checkLogin = false;

//models to import
const NoteModel = require("./models/NoteModel");
const UserModel = require("./models/UserModel");

//server and database setup
const port = process.env.PORT || 3001;
const url = "mongodb://charlie:password12@ds147975.mlab.com:47975/sparks_notes";
const app = express();
mongoose.connect(url);
mongoose.connection
.once("open", () => {
    console.log(`Mongoose is running`);
})
.on("error", (err) => {
    console.log(`There has been an error starting Mongoose: \n ${err}`);
});

//initialzing cors
const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
};

//middleware etc.
app.use(bodyParser.json());
app.use(session({
    secret: 'e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re',
    resave: true,
    saveUninitialized: true,
  }));
app.use(cors(corsOptions))
mongoose.Promise = global.Promise;

//local middleware that scopes routes for logged in users only
const loginMid = (req, res, next) => {
    if (!checkLogin){
        console.log(`The user is not logged in!`);
        res.status(401)
        res.json(`Please login to view this content`);
        return;
    }

    console.log(`The user is logged in and can view the content`);
    next();
};

//test route handler
app.get("/", (req, res) => {
    res.json([{title: "t1", message: "m1"}, {title: "t2", message: "m2"}]);
    //res.json({title: "test", message: "one"});
    //res.send("testeroo");
});

//post handler for adding a new user
app.post("/api/newUser", (req, res) => {
    const newUsername = req.body.username;
    const newPassword = req.body.password;

    if (!newUsername || !newPassword){
        console.log(`Problem creating a new user: either the username or password was not provided`);
        res.status(422)
        .json(`A username or password was not provided, please try again`);
        return;
    }

    const newUser = UserModel({
        username: newUsername,
        password: newPassword
    })
    .save()
    .then(response => {
        console.log(`The new user was saved!`);
        res.status(200)
        .json(response);
    })
    .catch(err => {
        console.log(`There was an error saving the new user: \n ${err}`);
        res.status(500)
        .json(`There was an error saving a the user`);
    })
});

//post handler for allowing a user to login
app.post("/api/login", (req, res) => {
    console.log(req.body.username, req.body.password);

    if (checkLogin){
        console.log(`The user is already logged in`);
        res.status(200)
        .json(`You're already logged in!`);
    }

    const newUsername = req.body.username;
    const newPassword = req.body.password;

    if (!newUsername || !newPassword){
        console.log(`Problem creating a new user: either the username or password was not provided`);
        res.status(422)
        .json(`A username or password was not provided, please try again`);
        return;
    }

    UserModel.findOne({username: newUsername})
    .then(response => {
        if (response === null){
            console.log(`No user with that username was found`);
            res.status(404)
            .json(`No user with that username was found`);
            return;
        }
        
        response.checkLogin(newPassword, (match) => {
            if (!match){
              res.status(422);
              res.send(`The password you entered was incorrect, please try again`);
            } else {
              console.log(`The user is now logged in`)
              //set equal to username
              checkLogin = true;
              console.log(checkLogin);
              res.status(200);
              res.json({success: true});
            }
          })
    })
    .catch(err => {
        res.status(500)
        .json(`There was an error on the server`);
    })
})

//get handler for accessing restricted content
app.get("/api/restricted", (req, res) => {
    console.log(`The user is logged in and can access the restricted content!`)
    res.status(200)
    .json(`Welcome to the dark side! We have cookies =]`)
})

//get handler for all notes
app.get("/api/allNotes", loginMid, (req, res) => {
    NoteModel.find({}, (err, response) => {
        if (err) return console.log(`There was an error getting the notes: ${err}`);
        console.log(`Here are all the notes: \n ${response}`);
        res.status(200)
        .json(response);
    })
});

//handler for adding a new note
app.post("/api/newnote", loginMid, (req, res) => {
    console.log(checkLogin);
    if (!checkLogin){
        console.log(`Line 159: The user is not logged in`);
        res.status(403)
        .json(`You need to log in to add a new note`);
        return;
    }

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
app.put("/api/editNote", loginMid, (req, res) => {
    const id = req.body.id;
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
app.delete("/api/deleteNote", loginMid, (req, res) => {
    const id = req.body.id;

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

app.listen(port, () => console.log(`The server is listening on port ${port}`));