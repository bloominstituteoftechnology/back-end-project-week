const express = require('express');

const cors = require('cors');

const db = require('./database/dbConfig.js')


const server = express();
const PORT = 4000;

server.use(express.json());
server.use(cors());


server.post('/api/notes', (req, res)=>{
    const note = req.body;
    db.insert(note)
    .then(ids =>{
        db.findById(ids[0])
        .then(notes=>{
            res.status(201).json(note)
        })
    }).catch(err =>{
        res.status(500).json({error:"Problem adding note", err})
    })
})

server.get('/api/notes', (req,res)=>{
    db.getAll()
    .then(notes =>{
        res.json(notes)
    }).catch(err =>{
        res.status(500).json({error:"Cannot get notes", err})
    })
})

server.get('/api/notes/:id', (req, res)=>{
    const { id } = req.params;
    db.findById(id)
    .then(note =>{
        if(note){
            res.json(note)
        }else{
            res.status(404).json({message:'The note with the specified id does not exist!'})
        }
    }).catch(err=>{
        res.status(500).json({error:"Trouble getting the note", err})
    })
})

server.put('/api/notes/:id', (req, res)=>{
    const { id } = req.params;
    const note = req.body;
    if(note.title && note.textBody){
        db.update(id, note)
        .then(updated =>{
            if(updated){
                db.findById(id).then(notes=>{
                    res.json(notes)
                }).catch(err=>{
                    res.status(500).json({message:"could not return updated note!"})
                })
            }else{
                res.status(404).json({message:"The note with the specified id does not exist!"})
            }
        }).catch(err =>{
            res.status(500).json({error:"The note could not be motified",err})
        })
    }else{
        res.status(400).json({message:"Missing a valid title and textBody"})
    }
})

server.delete('/api/notes/:id', (req, res)=>{
    const { id } = req.params;
    db.remove(id)
    .then(removed =>{
        if(removed){
            res.json({message:"Note has been Deleted!"})
        }else{
            res.status(500).json({message:"note id does not exist!"})
        }
    }).catch(err =>{
        res.status(500).json({error:"The note could not be removed!"})
    })
})


server.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}!`)
})


