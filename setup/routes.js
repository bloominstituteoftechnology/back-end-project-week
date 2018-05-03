const User = require('../Model/Users');

    // // server.post('/back-end/register', function(req, res){
    // //     const credentials = req.body;

    //     const Users = new User (credentials);
    //     Users.save().then( inserted => {
    //         res.status(201).json(inserted);
    //     });
    // });

    const NewNote = (req,res) => {
        const {title, content} = req.body;
        if(!title || !contents){
            res.status(400).json({errorMessage:'Please provide title and contents for the post'})
        }
        else{
            const newNote = {title,content}
            newNote
            .save()
            .then(post => {
                res.json(note);
            })
            .catch(err => {
                res.status(400).json({errorMessage:'ERROR'});
                return;
            })
        };
    }
    
    const ViewNote = (req,res) => {
        const {id} = req.params;
        Notes.find(_id)
        .then(notes => {
            const newNote = [];
            notes.forEach(notes => {
                const notesObj = {};
                notesObj.title = note.title;
                notesObj._id = notes._id;
                newNotes.push(notesObj);
            });
            res.json(newNotes);
        })
        .catch(err => {
            res.status(400).json({errorMessage:'ERROR'});
            return;
        });
    };
    
    const getNotes = (req,res) => {
        const {id} = req.params;
        Notes.findById(id)
        .populate('notes')
        .exec()
        .then(notes => {
            if (!notes[0]) res.status(404).json({errorMessage:'the post with the specified ID does not exist'})
            else res.json(posts[0]);
        })
        .catch(err => {
            res.status(500).json({errorMessage:"The post information could not be retrieved"})
        });
    };
    
    const deleteNotes = (req,res) => {
        const {id} = req.params;
        Notes.findByIdandRemove(_id)
        .then(note => {
            if (!note) res.status(404).json({errorMessage:'Note does not exist'});
            else res.status(200).json(note)
        });
    };
    
    const updateNotes = (req,res) => {
        const{id} = req.params;
        Notes.update(_id)
        .then( notes => {
            if (notesObj > 0) {
            Notes.findById(_id).then(updated => {
                res.status(200).json(updated);
            });
        }
        else {
            res.status(500).json({message:"post could not be modified"})
        }
        })
        .catch(error => {
            res.status(500).json({error: "The post info could not be modified"})
        })
    };
    

    module.exports = (server) => {
        server.route('/Notes').get(ViewNote)
        server.route('/').get(getNotes)
        server.route('/NewNote').post(NewNote)
        server.route('/deleteNotes').delete(deleteNotes)
    }
    
