const express = require('express');

const notes = express.Router();

const dbFunc = require('../db/db.js')

notes.use(express.json());

notes.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN api/notes/ is running."})
})


notes.get('/test/', (req, res) => {
    dbFunc.getNotes().then(allNotes => {
        res.status(200).send(allNotes)
    })
})

notes.get('/all/', (req, res) => {
    const { userid } = req.user
    //only return only notes that have the username in req.user.username
    dbFunc.getNotes(userid).then(allUserNotes => {
        res.status(200).json({allUserNotes: allUserNotes})
    }).catch(err => res.status(500).json({message: 'There was an error with the server.', err: err
    }))
})

notes.get('/:id', (req, res) => {
    const { userid } = req.user
    //only return notes that have the username in req.user.username
    dbFunc.getNote(userid, req.params.id).then(note => {
        res.status(200).json(note)
    }).catch(err => res.status(500).json({message: 'There was an error with the server.', err: err
    }))
})

notes.post('/', (req, res) => {
    const { textBody, title } = req.body
    const { userid } = req.user
    //include username in the submission
    req.body.userid = userid;
    console.log(req.body.userid, " \n ==req.body.userid== \n")
    //all new notes are assigned the same user Id

            if(textBody){
                dbFunc.addNote(req.body).then(id => {
                    res.status(201).json(id)
                })
            } else {
                res.status(400).send('Please include a textBody in your request.')
            }
       
    //deleted check for no ID cause I think that was messing things up
})

notes.put('/:id',  (req, res) => {
    const body = req.body
    const  editId  = req.params.id
        dbFunc.editNote(editId, body).then(res2 => {
            res.status(200).json(res2)
        }).catch(err => {
            res.staus(500).json(err)
        })
})

notes.delete('/:id', (req, res) => {
    const { id } = req.params
    //need to find a way to delete all notes that are children as well

    dbFunc.deleteNote(id).then(count => {
        if(count == 0){
            res.status(400).json('note not deleted. Either this note does not exist, or it was a bad request')
        } else {
            res.status(200).json(count)
        }
    }).catch(err => res.status(500).json({message: 'Note was note deleted', err: err.message}))
})

module.exports = notes
