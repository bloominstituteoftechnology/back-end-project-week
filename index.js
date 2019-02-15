const express = require("express");
const cors = require('cors');
const knex = require("knex");

const db = require('./database/dbConfig.js')

const PORT = 4200;
const server = express();


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
        res.status(500).json({error:"Error adding note", err})
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
            res.status(404).json({message:'Note with specified id does not exist!'})
        }
    }).catch(err=>{
        res.status(500).json({error:"Error getting that note", err})
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
                    res.status(500).json({message:"Error returning updated note!"})
                })
            }else{
                res.status(404).json({message:"Note with specified id does not exist!"})
            }
        }).catch(err =>{
            res.status(500).json({error:"Note can't be altered",err})
        })
    }else{
        res.status(400).json({message:"Requires a valid title and textBody"})
    }
})

server.delete('/api/notes/:id', (req, res)=>{
    const { id } = req.params;
    db.remove(id)
    .then(removed =>{
        if(removed){
            res.json({message:"Note has been Exterminated!"})
        }else{
            res.status(500).json({message:"note id doesn't exist!"})
        }
    }).catch(err =>{
        res.status(500).json({error:"Note cant be removed!"})
    })
})


//Server
server.listen(PORT, () => {

    console.log(`breathing on port ${PORT}`);
});