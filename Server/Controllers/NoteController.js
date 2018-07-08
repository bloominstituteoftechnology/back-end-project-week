const router = require("express").Router();
const Notes = require("../Schemas/NoteSchema");

const post = (req, res) => { //works
    const { title, body, author } = req.body;
    if(!title || !body || !author){
        res.status(401).json({Message: "Note must have title, body, tags, author"})
    }
    else{
        Notes.create({ title, body, author })
        .then(note => {
            if(!note){
                res.status(404).json({Message: "note not found"});
            }
            else{
                res.status(201).json(note);
            }
        })
        .catch(err => {
            res.status(500).json({Error: "There was an error in saving note", err});
        });
    }
};
    

const get = (req, res) => { //works
    Notes.find()
        .then(notes => {
            if(notes.length===0){
                res.status(404).json({Message: "notes not found"})
            } else {
                res.status(200).json(notes);
            }
        })
        .catch(err => {
            res.status(500).json({Error: "There was an error in retrieving notes", err});
        });
};

const getId = (req, res) => { //works
    const { id } = req.params;
    if(!id){
        res.status(400).json({Error: "The specified id doesn't not exist"})
    } else{
        Notes.findById(id)
            .then(note => {
                if(note.length===0){
                    res.status(404).json({Error: "Note could not be found"});
                } else {
                    res.status(200).json(note);
                }
            })
            .catch(err => {
                res.status(500).json({Error: err.message});
            });
    };
        
     
};

const deleteId = (req, res) => { //works
    const { id } = req.params;
    if(!id){
        res.status(400).json({Error: "The specified id does not exist"})
    } else{
        Notes.findByIdAndRemove(id)
            .then(note => {
                res.status(200).json({Success: `${id} has been removed from our database`, note});
            })
            .catch(err => {
                res.status(500).json({Error: err.message});
            });
        };
};

const updateId = (req, res) => {
    const { id } = req.params;
    const { title, body, author } = req.body;
    if(!id){
        res.status(400).json({Error: "The specified id doesn't exist"});
    } else if(!title, !body, !author){
        res.status(400).json({Error: "Note must include title, body, and author"});
    } else { 
        Notes.findByIdAndUpdate(id, {title, body, tags, author})
            .then(note => {
                res.status(200).json({Success: `${id} has been updated`, note});
            })
            .catch(err => {
                res.status(500).json({Error: err.message});
            });
    };
};
// "http://localhost:25851/api/notes/"
router.route("/")
    .post(post)
    .get(get);

router.route("/:id")
    .get(getId)
    .delete(deleteId)
    .put(updateId);



module.exports = router;