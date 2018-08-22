const server = require('express')()
const db = require('../../data/db')


server.get('/', (req,res) => {
    res.status(200).json("App is currently running (better go out and catch it!)")
})

server.get('/get/all', (req,res,next) => {

    db('notes')
        .select('*')
        .then(notes => {
            const promises = notes.map(note => {
                return new Promise((resolve, reject) => 
                    db('tags')
                        .where({ note_id: note.id })
                        .then(tagsIn => {
                            newTags = tagsIn.map(tagObject => tagObject.tag)
                            note['tags'] = newTags
                            resolve(note)
                        }) 
                    ) 
            })
            Promise.all(promises)
                .then(results => {
                    res.status(200).json(results)
                })
                .catch(next)
        }).catch(next)
})

server.get('/get/:id', (req,res,next) => {
    const { id } = req.params

    if(!id){
        res.status(404).json("ID Not found")
    }
    db('notes')
        .select('*')
        .where({id})
        .first()
        .then(note => {
            if(!note){
                res.status(404).json({error: true, message: "No note with that ID"})
            }else{
                db('tags')
                    .where({ note_id: note.id })
                    .then(tags => {
                        note['tags'] = tags.map(tagObject => tagObject.tag)
                        res.status(200).json(note)
                    })
                
            }
            
        })
        .catch(next)
})

server.post('/post', (req,res,next) => {
    const newNote = { title: req.body.title, textBody: req.body.textBody }
    let tags = req.body.tags

    if(!newNote.title || !newNote.textBody){
        res.status(418).json({error: true, message: "Missing title or textBody"})
    }

    
    db('notes')
        .insert(newNote)
        .into('notes')
        .then(id => {
            const promises = tags.map(tag => {
                return new Promise((resolve, reject) => {
                    db('tags')
                        .insert({ note_id: id[0], tag: tag })
                        .then(response => {
                            resolve(tag)
                        })
                        .catch(next)
                })
            })
            Promise.all(promises)
                .then(res.status(200).json({ inserted_id: id, inserted: newNote }))
                .catch(next)
        })
        .catch(next)
})

server.delete('/delete/:id', (req,res,next) => {
    const { id } = req.params

    db('notes')
        .where({id})
        .del()
        .then(id => {
            res.status(200).json({ deleted_id: id })
        })
        .catch(next)
})

server.put('/edit/:id', (req,res,next) => {
    const { id } = req.params
    const updated = req.body

    updated.tags = updated.tags.join(',')

    db('notes')
        .where({id})
        .update(updated)
        .then(response => {
            res.status(200).json({response})
        })
})

module.exports = server