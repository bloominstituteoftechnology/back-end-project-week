const express = require('express');

const note = require('./noteModel'); 

const noteRouter = express.router();

 const getNotes = (req, res) => {
    note
      .find()
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).josn({ errorMessage: 'Unable to populate notes' });
      });
};      

const createNotes = (req, res) => {
    const note = new note(req.body);
    note
      .save()
      .then(newNote => {
        res.status(201).json(newNote);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: 'Unable to add note' });
      });
}; 


const viewNote = (req, res) => {

}

const editNote = (req, res) => {

}


const deleteNote = (req, res) => {
    
}


noteRouter.get('/notes', getNotes); // get list of notes

noteRouter.post('/notes', createNotes); // create a new note with title and content

noteRouter.get('/:id', viewNote); // view existing note // findbyid

noteRouter.put('/:id', editNote); // edit existing note

noteRouter.delete('/:id', deleteNote); // delete existing note

export default noteRouter;