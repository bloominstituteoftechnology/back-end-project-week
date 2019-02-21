const express = require('express');
const RouterNote = express.Router();
const TaskManager = require('../taskmanager/taskmanager');


// ** ROUTERS FOR OUR LAMBDA NOTES APP ** //

// ## GET ALL NOTES
RouterNote.get('/get/all',TaskManager.getAllNotes);

// ## GET A NOTE
RouterNote.get('/get/:id',TaskManager.getNotebyId);

// ## CREATE A NOTE/create
RouterNote.post('/create',TaskManager.CreateNewNote);

// ## EDIT A NOTE
RouterNote.put('/edit/:id',TaskManager.UpdateNote);

// ## DELETE A NOTE
RouterNote.delete('/delete/:id',TaskManager.DestroyNote);

module.exports = RouterNote;
