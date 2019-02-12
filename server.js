const express = require('express');
const server = express();
const middleware = require('./middleware');
const db = require('./dbConfig');
const port = 3000;

middleware(server);
server.use(express.json());


//Get request for all notes
server.get('/notes', async(req,res) =>{
    const notes = await db('notes');
    try{
        res.status(200).json(notes);
    }catch(err){
        res.status(500).json({message: 'Could not get notes data'});
    }
});

//Get request for note by id
server.get('/notes/:id' , (req, res) =>{
    const {id} = req.params;
    db('notes').where('id', id)
        .then(rows =>{
            res.status(200).json(rows);
        })
        .catch(() =>{
            res.status(500).json({message: 'Could not fetch not with specified id'})
        });
});

//Post request for creating note
server.post('/notes', (req, res) =>{
    const newNote = req.body;
    if(newNote.title && newNote.content){
        db('notes').insert(newNote)
        .then(ids =>{
            res.status(201).json({message: `New note created with id : ${ids}`})
        })
        .catch(() =>{
            res.status(500).json({message: 'Could not add new note'})
        })
    }else{
        res.status(404).json({message: 'Missing note title or content'})
    }
    
})

//Delete request
server.delete('/notes/:id', (req, res) =>{
    const {id} = req.params;
    db('notes').where('id', id).del()
        .then(rowCount =>{
            res.status(200).json({message: `Successfully deleted. Number of items deleted: ${rowCount}`})
        })
        .catch(() =>{
            res.status(500).json({message: 'Could not delete note with specified id'})
        })
})

//Put request
server.put('/notes/:id', (req, res) =>{
    const {id} = req.params;
    const noteBody = req.body;
    db('notes').where('id', id).update(noteBody)
        .then(rowCount =>{
            res.status(201).json({message: `Note successfully updated. Number of items updated: ${rowCount}`})
        })
        .catch(() =>{
            res.status(500).json({message: 'Sorry, could not update note'})
        })
})


server.listen(port, () =>{
    console.log(`Server is up and running on port ${port}`)
});

module.exports = server;